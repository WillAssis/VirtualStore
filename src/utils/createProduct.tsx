function validateNameValue(inputValue: string | null) {
  if (inputValue === '' || inputValue === null) {
    return 'Nome do produto é obrigatório';
  }
  return '';
}

function validatePriceValue(priceValue: string | null) {
  const value: number = Number(priceValue);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 'Valor inválido, insira um número';
  } else if (value < 0.01) {
    return 'Preço deve ser maior que R$ 0.01';
  }
  return '';
}

function validateDescriptionValue(inputValue: string | null) {
  if (inputValue === '' || inputValue === null) {
    return 'Descrição do produto é obrigatória';
  }
  return '';
}

async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;

  const nameError = validateNameValue(name);
  const priceError = validatePriceValue(price);
  const descriptionError = validateDescriptionValue(description);
  const isInputValid =
    nameError === '' && priceError === '' && descriptionError === '';

  if (isInputValid) {
    const response = await fetch('http://localhost:3333/novo-produto', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    return {
      success: response.ok,
      errors: data.errors ?? { nameError, priceError, descriptionError },
    };
  }

  return {
    success: false,
    errors: { nameError, priceError, descriptionError },
  };
}

export default createProduct;
