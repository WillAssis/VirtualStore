import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  validateName,
  validateDescription,
  validatePrice,
} from '../../utils/validateProduct';
import useEditor from '../../hooks/useEditor';
import Container from '../../components/Container/Container';
import OverlayLoading from '../../components/Loading/OverlayLoading';
import Title from '../../components/Title/Title';
import Button from '../../components/Buttons/Button';
import TextInput from '../../components/Inputs/TextInput';
import TextAreaInput from '../../components/Inputs/TextAreaInput';
import PriceInput from '../../components/Inputs/PriceInput';
import ProductImages from '../../components/Inputs/ProductImages';
import styles from './AdminProductEditor.module.scss';

const PLACEHOLDER_IMG_PATH = '/images/placeholder.png';

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 16C12.8 16 13.57 15.93 14.31 15.82L17.22 12.91C15.89 13.59 14 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.13L19.39 10.74C19.57 10.56 19.78 10.42 20 10.3V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.04 7.06 20.72 11 20.97V19.13L11.17 18.96C7.84 18.76 6 17.46 6 17V14.77C7.61 15.55 9.72 16 12 16M12 5C15.87 5 18 6.5 18 7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" />
  </svg>
);

function AdminProductEditor() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, updateProduct } = useEditor(slug ?? '');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0.01');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');

  // Guarda as urls das imagens para serem mostradas como preview no image input
  const [images, setImages] = useState<string[]>(
    Array(5).fill(PLACEHOLDER_IMG_PATH),
  );

  useEffect(() => {
    if (product) {
      const newImages = [...product.images, ...images].slice(0, 5);
      setName(product.name);
      setDescription(product.description);
      setPrice(`${product.price.toFixed(2)}`);
      setImages(newImages);
    }
  }, [product]);

  const goBack = () => navigate('/admin/produtos');

  const sendData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { success, errors } = await updateProduct(formData);

    if (success) {
      goBack();
    } else {
      setNameError(errors.nameError);
      setPriceError(errors.priceError);
      setDescriptionError(errors.descriptionError);
    }
  };

  return (
    <>
      <OverlayLoading loading={loading} />
      <Container>
        <div className={styles.contentWrapper}>
          <Title icon={icon} text={slug ? 'Editar produto' : 'Criar produto'} />
          <form className={styles.form} onSubmit={sendData} noValidate>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputsColumn}>
                <TextInput
                  label="Nome"
                  name="name"
                  value={name}
                  setValue={setName}
                  error={nameError}
                  setError={setNameError}
                  validateInput={validateName}
                />
                <TextAreaInput
                  label="Descrição"
                  name="description"
                  value={description}
                  setValue={setDescription}
                  error={descriptionError}
                  setError={setDescriptionError}
                  validateInput={validateDescription}
                />
                <PriceInput
                  label="Preço"
                  name="price"
                  value={price}
                  setValue={setPrice}
                  error={priceError}
                  setError={setPriceError}
                  validateInput={validatePrice}
                />
              </div>
              <div className={styles.inputsColumn}>
                <ProductImages images={images} setImages={setImages} />
              </div>
            </div>
            <div className={styles.controlsWrapper}>
              <Button>Salvar</Button>
              <Button
                type="button"
                onClick={goBack}
                style={{
                  backgroundColor: 'var(--font)',
                  color: 'var(--background-primary',
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default AdminProductEditor;
