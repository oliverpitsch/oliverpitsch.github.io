// Temporary workaround to avoid Next.js PageProps generic inferring params as Promise<any>
// Adjusts the declaration to make `params` structurally compatible with our usage.
// Remove once Next.js fixes the incorrect Promise inference in PageProps (15.x regression).

declare module 'next' {
  // Augment (do NOT replace) the existing exported interface
  // Making fields optional & broad to avoid erroneous Promise<any> inference in build output.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface PageProps {
    params?: any;
    searchParams?: any;
  }
}
