import Container from '@/components/layout/Container';
import PageShell from '@/components/layout/PageShell';

export const metadata = {
  title: 'Imprint – Oliver Pitsch',
};

export default function Imprint() {
  return (
    <PageShell>
      <Container size="prose" className="pt-14 pb-4">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em]">
          Imprint / Contact Information
        </h1>
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
            Im Geschäftsverkehr mit Kaufleuten, juristischen Personen des öffentlichen Rechts oder
            bei öffentlich-rechtlichem Unternehmen ist der Gerichtsstand Köln.
          </p>
          <p>
            Im Falle von Namensrecht-/Domainstreitigkeiten, Textaussagen- u. Inhalte bzw.
            Abmahnungen gegen geltendes Wettbewerbsrecht bzw. Fernabsatzgesetz bitte ich Sie, zur
            Vermeidung unnötiger Rechtsstreite und Kosten, mich bereits im Vorfeld zu kontaktieren.
            Die Kostennote einer anwaltlichen Abmahnung ohne vorhergehende Kontaktaufnahme wird im
            Sinne der Schadensminderungspflicht als unbegründet zurückgewiesen.
          </p>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Downloads, Vervielfältigung, Bearbeitung, Verbreitung
            und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors. Soweit die Inhalte auf dieser Seite
            nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
          </p>

          <h3 className="text-[16px] font-normal opacity-90 mt-8">Anwendungsbereiche</h3>
          <p>
            Dieses Impressum ist ebenso gültig für die Präsenzen von Oliver Pitsch auf Facebook,
            Instagram, Twitter, LinkedIn, Xing. Außerdem für das Projekt Joinride auf Joinride.cc
            und alle Joinride Social Media Präsenzen.
          </p>

          <h3 className="text-[16px] font-normal opacity-90 mt-8">Haftungsausschluss</h3>
          <p>
            Ich habe keinen Einfluss auf die Inhalte verlinkter Seiten, deshalb kann ich für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
            stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden
            von Rechtsverletzungen werden derartige Links umgehend entfernt.
          </p>

          <p className="font-medium">
            Zu Risiken und Nebenwirkungen lesen Sie die Packungsbeilage oder fragen Sie Ihren Arzt
            oder Apotheker.
          </p>
          <p className="font-medium">Mobilfunkpreise können abweichen.</p>
          <p className="font-medium">Füllhöhe technisch bedingt.</p>
          <p className="font-medium">Kann Spuren von Nüssen enthalten.</p>
        </section>
      </Container>
    </PageShell>
  );
}
