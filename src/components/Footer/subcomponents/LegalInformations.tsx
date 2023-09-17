function LegalInformations() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className="legal-informations">
      <p>Copyright © {year} SOLUS Personalizados</p>
      <p>CNPJ nº 55.555.555/5555-55</p>
    </div>
  );
}

export default LegalInformations;
