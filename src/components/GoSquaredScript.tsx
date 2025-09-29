'use client';
import Script from 'next/script';

export default function GoSquaredScript() {
  return (
    <Script id="gosquared-analytics" strategy="afterInteractive">{`
  !function(g,s,q,r,d){r=g[r]=g[r]||function(){(r.q=r.q||[]).push(arguments)};
  d=s.createElement(q);d.src='//d1l6p2sc9645hc.cloudfront.net/gosquared.js';q=
  s.getElementsByTagName(q)[0];q.parentNode.insertBefore(d,q)}(window,document
  ,'script','_gs');

  _gs('GSN-737179-D');
  _gs('set', 'anonymizeIP', true);
`}</Script>
  );
}
