const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="font-heading text-3xl text-gradient-gold mb-2">BARBER MASTER</h3>
        <p className="font-body text-muted-foreground text-sm">
          A ferramenta #1 de gestão para barbearias do Brasil.
        </p>
        <p className="font-body text-muted-foreground/50 text-xs mt-6">
          © {new Date().getFullYear()} Barber Master. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
