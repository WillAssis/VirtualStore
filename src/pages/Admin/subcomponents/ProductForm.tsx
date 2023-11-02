import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductName from '../../../components/Inputs/ProductName';
import ProductDescription from '../../../components/Inputs/ProductDescription';
import ProductPrice from '../../../components/Inputs/ProductPrice';
import ProductImages from '../../../components/Inputs/ProductImages';
import Loading from '../../../components/Loading/Loading';
import createProduct from '../../../utils/createProduct';
import editProduct from '../../../utils/editProduct';
import './ProductForm.css';

const PLACEHOLDER_IMG_PATH = '/images/placeholder.png';

function ProductForm() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0.01');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Guarda as urls das imagens para serem mostradas como preview no image input
  const [images, setImages] = useState<string[]>(
    Array(5).fill(PLACEHOLDER_IMG_PATH)
  );

  useEffect(() => {
    // Carrega as informações do produto a ser editado, se houver
    if (slug) {
      fetch(`http://localhost:3333/produto/${slug}`)
        .then((response) => response.json())
        .then((product) => {
          setName(product.name);
          setDescription(product.description);
          setPrice(`${product.price.toFixed(2)}`);
          product.images.forEach((url: string, index: number) => {
            const currentImages = images.slice();
            currentImages[index] = url;
            setImages(currentImages);
          });
        });
    }
    setTimeout(() => setIsLoading(false), 500); // delay
  }, [slug]);

  const goBack = () => navigate('/admin/produtos');

  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let request;

    if (slug) {
      request = await editProduct(formData, slug);
    } else {
      request = await createProduct(formData);
    }

    if (request.success) {
      setLoadingMessage(
        `Produto ${
          slug ? 'editado' : 'cadastrado'
        } com sucesso. Redirecionando para a página dos produtos`
      );
      await new Promise((resolve) => setTimeout(resolve, 2500)); // delay
      goBack();
    } else {
      setNameError(request.errors.nameError);
      setPriceError(request.errors.priceError);
      setDescriptionError(request.errors.descriptionError);
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-product-form">
      {isLoading ? (
        <Loading error={loadingMessage} />
      ) : (
        <>
          <h2>{slug ? 'Editar produto' : 'Criar produto'}</h2>
          <form onSubmit={sendData} noValidate>
            <div className="form-content-wrapper">
              <div>
                <ProductName
                  value={name}
                  setValue={setName}
                  error={nameError}
                  setError={setNameError}
                />
                <ProductDescription
                  value={description}
                  setValue={setDescription}
                  error={descriptionError}
                  setError={setDescriptionError}
                />
                <ProductPrice
                  value={price}
                  setValue={setPrice}
                  error={priceError}
                  setError={setPriceError}
                />
              </div>
              <div>
                <ProductImages images={images} setImages={setImages} />
              </div>
            </div>
            <div className="form-controls-wrapper">
              <button>Salvar</button>
              <button type="button" onClick={goBack}>
                Cancelar
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
}

export default ProductForm;
