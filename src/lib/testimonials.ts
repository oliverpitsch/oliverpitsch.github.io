/**
 * Short quotes from people Oliver led or worked alongside. The homepage
 * section renders only when this list has entries, so it is safe to ship empty.
 * Use real quotes with permission, e.g. from LinkedIn recommendations.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** Their role and how they worked with Oliver, e.g. "Product Designer, reported to Oliver at Trusted Shops". */
  context: string;
};

export const testimonials: Testimonial[] = [];
