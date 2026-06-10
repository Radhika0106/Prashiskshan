// ─────────────────────────────────────────────────────────────────────────────
// Prashikshan ML Engines — Pure Math Utilities
//
// No external dependencies.  Every function is pure and side-effect-free.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compute the cosine similarity between two numeric vectors.
 *
 * ```
 * cos(θ) = (A · B) / (‖A‖ × ‖B‖)
 * ```
 *
 * @param a - First vector.
 * @param b - Second vector (must have the same length as `a`).
 * @returns A value in [-1, 1].  Returns 0 when either vector is zero-length
 *          or has zero magnitude.
 *
 * @example
 * ```ts
 * cosineSimilarity([1, 0], [0, 1]); // 0  — orthogonal
 * cosineSimilarity([1, 2], [1, 2]); // 1  — identical direction
 * ```
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  if (a.length !== b.length) {
    throw new RangeError(
      `Vector length mismatch: a.length=${a.length}, b.length=${b.length}`,
    );
  }

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  const denominator = Math.sqrt(magA) * Math.sqrt(magB);

  // Guard against zero-magnitude vectors (division by zero).
  if (denominator === 0) return 0;

  return dot / denominator;
}

// ─────────────────────────────────────────────────────────────────────────────
// TF-IDF
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a TF-IDF matrix from an array of text documents.
 *
 * ### Formulas
 * | Metric | Formula |
 * |--------|---------|
 * | **TF(t, d)** | count(t in d) / total_terms(d) |
 * | **IDF(t)** | log(N / (1 + df(t))) |
 * | **TF-IDF(t, d)** | TF(t, d) × IDF(t) |
 *
 * Where `N` is the total number of documents and `df(t)` is the number of
 * documents that contain the term `t`.
 *
 * @param documents - Array of raw text strings.  Each string is one document.
 * @returns An object containing:
 *  - `matrix`     – `number[][]` where `matrix[docIdx][termIdx]` is the
 *                    TF-IDF weight.
 *  - `vocabulary` – The ordered list of unique terms (columns of the matrix).
 *
 * @example
 * ```ts
 * const { matrix, vocabulary } = tfidfVectorize([
 *   'react node express',
 *   'python tensorflow keras',
 * ]);
 * ```
 */
export function tfidfVectorize(documents: string[]): {
  matrix: number[][];
  vocabulary: string[];
} {
  if (documents.length === 0) {
    return { matrix: [], vocabulary: [] };
  }

  // 1. Tokenize every document.
  const tokenizedDocs: string[][] = documents.map(tokenize);

  // 2. Build vocabulary — ordered set of all unique terms.
  const vocabSet = new Set<string>();
  for (const tokens of tokenizedDocs) {
    for (const t of tokens) {
      vocabSet.add(t);
    }
  }
  const vocabulary = Array.from(vocabSet).sort();

  // Fast lookup: term → column index.
  const termIndex = new Map<string, number>();
  vocabulary.forEach((term, idx) => {
    termIndex.set(term, idx);
  });

  const N = documents.length;
  const V = vocabulary.length;

  // 3. Document frequency — how many docs contain each term.
  const df = new Float64Array(V);
  for (const tokens of tokenizedDocs) {
    const seen = new Set<string>();
    for (const t of tokens) {
      if (!seen.has(t)) {
        seen.add(t);
        df[termIndex.get(t)!]++;
      }
    }
  }

  // 4. IDF vector.
  const idf = new Float64Array(V);
  for (let j = 0; j < V; j++) {
    idf[j] = Math.log(N / (1 + df[j]));
  }

  // 5. Build TF-IDF matrix.
  const matrix: number[][] = [];
  for (const tokens of tokenizedDocs) {
    const row = new Array<number>(V).fill(0);
    const totalTerms = tokens.length;

    if (totalTerms === 0) {
      matrix.push(row);
      continue;
    }

    // Count term frequencies.
    const counts = new Map<number, number>();
    for (const t of tokens) {
      const idx = termIndex.get(t)!;
      counts.set(idx, (counts.get(idx) ?? 0) + 1);
    }

    // TF × IDF.
    for (const [idx, count] of counts) {
      row[idx] = (count / totalTerms) * idf[idx];
    }

    matrix.push(row);
  }

  return { matrix, vocabulary };
}

// ─────────────────────────────────────────────────────────────────────────────
// Normalization & scoring helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Linearly normalise a value into the [0, 1] range.
 *
 * @param value - The raw value to normalise.
 * @param min   - The lower bound of the original range.
 * @param max   - The upper bound of the original range.
 * @returns The normalised value, clamped to [0, 1].
 *          Returns 0 when `min === max` to avoid division by zero.
 *
 * @example
 * ```ts
 * normalize(75, 0, 100); // 0.75
 * normalize(-10, 0, 100); // 0  (clamped)
 * ```
 */
export function normalize(value: number, min: number, max: number): number {
  if (min === max) return 0;
  return clamp((value - min) / (max - min), 0, 1);
}

/**
 * Compute a weighted sum from an array of `{ value, weight }` pairs.
 *
 * ```
 * result = Σ (value_i × weight_i)
 * ```
 *
 * @param scores - Array of value-weight pairs.
 * @returns The weighted sum.  Returns 0 for an empty array.
 *
 * @example
 * ```ts
 * weightedScore([
 *   { value: 0.8, weight: 0.5 },
 *   { value: 0.6, weight: 0.3 },
 *   { value: 0.9, weight: 0.2 },
 * ]); // 0.76
 * ```
 */
export function weightedScore(
  scores: { value: number; weight: number }[],
): number {
  if (scores.length === 0) return 0;

  let total = 0;
  for (const { value, weight } of scores) {
    total += value * weight;
  }
  return total;
}

// ─────────────────────────────────────────────────────────────────────────────
// Text utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tokenize a string into an array of lowercase words.
 *
 * - Strips all characters except letters, digits, and whitespace.
 * - Splits on whitespace.
 * - Filters out empty tokens.
 *
 * @param text - Raw input string.
 * @returns An array of lowercase word tokens.
 *
 * @example
 * ```ts
 * tokenize('Hello, World!  React.js & Node'); // ['hello', 'world', 'reactjs', 'node']
 * ```
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// Numeric helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clamp a numeric value to the inclusive range [`min`, `max`].
 *
 * @param value - The value to clamp.
 * @param min   - Lower bound.
 * @param max   - Upper bound.
 * @returns `min` if value < min, `max` if value > max, otherwise `value`.
 *
 * @example
 * ```ts
 * clamp(1.5, 0, 1);  // 1
 * clamp(-0.2, 0, 1); // 0
 * clamp(0.7, 0, 1);  // 0.7
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
