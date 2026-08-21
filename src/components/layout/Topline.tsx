/** The three indigo stripes that open every page. Also the site's favicon. */
export default function Topline() {
  return (
    <div
      className="h-1.5 w-full bg-[linear-gradient(to_bottom,#4338ca_0_33.333%,#6366f1_33.333%_66.667%,#a5b4fc_66.667%_100%)] print:hidden"
      aria-hidden
    />
  );
}
