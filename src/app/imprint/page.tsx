import Link from "next/link";

export const metadata = {
  title: "Imprint – Oliver Pitsch",
};

export default function Imprint() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#182B52] text-[#182B52] dark:text-white">
      <div className="h-7 w-full bg-gradient-to-b from-[#FFAA00] via-[#FFBF00] to-[#FFD500]" />
      <main className="mx-auto max-w-3xl px-4">
        <p className="text-center mt-16">
          <Link href="/" className="underline">← Back</Link>
        </p>
        <h1 className="mt-8 text-[28px] font-semibold">Imprint / Contact Information</h1>
        <h3 className="text-[16px] font-normal opacity-90">
          Some parts are German only, because only they insist on that stuff.
        </h3>

        <section className="mt-8 space-y-4 text-[16px] leading-7">
          <p>
            Angaben gemäß §5 TMG:
            <br />
            Oliver Pitsch
            <br />
            Gerhard-vom-Rath-Straße 63 · 50968 Köln
            <br />
            USt-IdNr.: DE279520073
          </p>

          <h3 className="text-[16px] font-normal opacity-90 mt-8">Contact</h3>
          <p>
            Mobile: +49 175 2066584
            <br />
            Email: office‎@‎pitsch.me
          </p>

          <p>
            Im Geschäftsverkehr mit Kaufleuten, juristischen Personen des öffentlichen Rechts oder bei öffentlich-rechtlichem Unternehmen ist der Gerichtsstand Köln.
          </p>
          <p>
            Im Falle von Namensrecht-/Domainstreitigkeiten, Textaussagen- u. Inhalte bzw. Abmahnungen gegen geltendes Wettbewerbsrecht bzw. Fernabsatzgesetz bitte ich Sie, zur Vermeidung unnötiger Rechtsstreite und Kosten, mich bereits im Vorfeld zu kontaktieren. Die Kostennote einer anwaltlichen Abmahnung ohne vorhergehende Kontaktaufnahme wird im Sinne der Schadensminderungspflicht als unbegründet zurückgewiesen.
          </p>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Downloads, Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
          </p>

          <h3 className="text-[16px] font-normal opacity-90 mt-8">Anwendungsbereiche</h3>
          <p>
            Dieses Impressum ist ebenso gültig für die Präsenzen von Oliver Pitsch auf Facebook, Instagram, Twitter, LinkedIn, Xing. Außerdem für das Projekt Joinride auf Joinride.cc und alle Joinride Social Media Präsenzen.
          </p>

          <h3 className="text-[16px] font-normal opacity-90 mt-8">Haftungsausschluss</h3>
          <p>
            Ich habe keinen Einfluss auf die Inhalte verlinkter Seiten, deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.
          </p>

          <p className="font-medium">Zu Risiken und Nebenwirkungen lesen Sie die Packungsbeilage oder fragen Sie Ihren Arzt oder Apotheker.</p>
          <p className="font-medium">Mobilfunkpreise können abweichen.</p>
          <p className="font-medium">Füllhöhe technisch bedingt.</p>
          <p className="font-medium">Kann Spuren von Nüssen enthalten.</p>
        </section>

        <footer className="mt-24 mb-1 text-center relative">
          <div className="bg-[#FFD500] py-2 text-[12px]">
            <Link href="/imprint" className="underline text-[#182B52]">Imprint & Data Privacy</Link>
          </div>
          <div className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-b from-[#FFBF00] to-[#FFAA00]" />
        </footer>
      </main>
    </div>
  );
}
