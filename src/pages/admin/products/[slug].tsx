import { ChangeEvent, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';

import { AdminLayout } from '@/components/layouts'
import { IProduct } from '@/interfaces';
import { dbProducts } from '@/database';
import { fabulhadaApi } from '@/api';
import { Product } from '@/models';


const validTypes = ['hada', 'elfo', 'angel', 'buda', 'duende', 'gnomo', 'mago', 'genio', 'brujas', 'elementos', 'sirenas', 'miticos', 'zodiaco', 'lamparas', 'fuentes', 'bisuteria', 'recipiente', 'portasahumerio'];
const validCategory = ['amor-armonia', 'abundancia-prosperidad', 'salud-vitalidad', 'sabiduria-poder', 'naturaleza-zodiaco', 'proteccion-talismanes'];
const validKinds = ['Simple', 'Compuesto'];


interface FormData {
    _id?: string;
    iam: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    size: string;
    kind: string[];
    slug: string;
    tags: string[];
    personage: string;
    type: string;
    category: string;
    color: string;
    feature: string;
    observations: string;
}


interface Props {
    product: IProduct;
}

const ProductAdminPage: FC<Props> = ({ product }) => {

    // Cloudinary
    const [url, updateUrl] = useState();
    const [error, updateError] = useState();

    function handleOnUpload(error: SetStateAction<undefined>, result: { info: { secure_url: SetStateAction<undefined>; }; }, widget: { close: (arg0: { quiet: boolean; }) => void; }) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        updateUrl(result?.info?.secure_url);
    }

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            let kpersonage = ' '
            let kfeature = '_'

            if (name === 'personage' || name === 'feature') {
                    kpersonage = value.personage?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLocaleLowerCase() || '';
            // }
            // if (name === 'feature' && value.feature !=='') {
                    kfeature = value.feature?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll("'", '')
                    .toLocaleLowerCase() || '';
                    const newSlug = value.type?.trim() + '_' + kfeature + '_' + kpersonage + '_' + value.category?.trim()
                    setValue('slug', newSlug);
            }

            });
        return () => subscription.unsubscribe();
    }, [watch, setValue])

    const onChangeKind = (kind: string) => {
        const currentKinds = getValues('kind');
        if (currentKinds.includes(kind)) {
            return setValue('kind', currentKinds.filter(s => s !== kind), { shouldValidate: true });
        }

        setValue('kind', [...currentKinds, kind], { shouldValidate: true });

    }


    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');

        if (currentTags.includes(newTag)) {
            return;
        }

        currentTags.push(newTag);
    }

    const onDeleteTag = (tag: string) => {
        const updatedTags = getValues('tags').filter(t => t !== tag);
        setValue('tags', updatedTags, { shouldValidate: true });
    }

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }

        try {

            // console.log( file );
            for (const file of target.files) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await fabulhadaApi.post<{ message: string }>('/admin/upload', formData);
                setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
            }


        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteImage = (image: string) => {
        setValue(
            'images',
            getValues('images').filter(img => img !== image),
            { shouldValidate: true }
        );
    }

    const onSubmit = async (form: FormData) => {

        if (form.images.length < 2) return alert('Mínimo 2 imagenes');
        setIsSaving(true);

        try {
            const { data } = await fabulhadaApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',  // si tenemos un _id, entonces actualizar, si no crear
                data: form
            });

            // console.log({data});
            if (!form._id) {
                router.replace(`/admin/products/${form.slug}`);
            } else {
                setIsSaving(false)
            }


        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }

    }

    return (
        <AdminLayout
            title={'Producto'}
            subTitle={`Editando: ${product.personage}`}
            icon={<Icon icon="carbon:category-new-each" color="#019" width="35" />}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button
                        // color="secondary"
                        className='circular-btn'
                        startIcon={<Icon icon="fluent-mdl2:save" color="#fff" width="25" />}
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={isSaving}
                    >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="Personaje"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('personage', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.personage}
                            helperText={errors.personage?.message}
                        />
                        <TextField
                            label="Características"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('feature', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.feature}
                            helperText={errors.feature?.message}
                        />
                        <TextField
                            label="Materiales"
                            variant="filled"
                            multiline
                            maxRows={4}
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('description', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputAdornment>,
                            }}

                            // fullWidth 
                            sx={{ mb: 1, mr: 3 }}
                            {...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.inStock}
                            helperText={errors.inStock?.message}
                        />
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            // fullWidth 
                            sx={{ mb: 1 }}
                            {...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                        <TextField
                            label="Tamaño"
                            variant="filled"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                            }}
                            // fullWidth 
                            sx={{ mb: 1, mr: 3 }}
                            {...register('size', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.size}
                            helperText={errors.size?.message}
                        />
                        <TextField
                            label="Color"
                            variant="filled"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">&nbsp;&nbsp;</InputAdornment>,
                            }}
                            // fullWidth 
                            sx={{ mb: 1 }}
                            {...register('color', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor cero' }
                            })}
                            error={!!errors.color}
                            helperText={errors.color?.message}
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('type')}
                                onChange={({ target }) => setValue('type', target.value, { shouldValidate: true })}
                            >
                                {
                                    validTypes.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Categoría</FormLabel>
                            <RadioGroup
                                row
                                value={getValues('category')}
                                onChange={({ target }) => setValue('category', target.value, { shouldValidate: true })}
                            >
                                {
                                    validCategory.map(option => (
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio color='secondary' />}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        {/* <FormGroup>
                            <FormLabel>Clase</FormLabel>
                            {
                                validKinds.map(kind => (
                                    <FormControlLabel
                                        key={kind}
                                        control={ <Checkbox checked={ getValues('kind').includes(kind) } />} 
                                        label={ kind } 
                                        onChange={ () => onChangeKind( kind )  }
                                    />
                                ))
                            }
                        </FormGroup> */}

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco' : undefined
                            })}
                            error={!!errors.slug}
                            helperText={errors.slug?.message}
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            multiline
                            maxRows={4}
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('iam', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={!!errors.iam}
                            helperText={errors.iam?.message}
                        />
                        <TextField
                            label="Observaciones"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            {...register('observations')}
                        // error={ !!errors.observations }
                        // helperText={ errors.observations?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            helperText="Presiona [Spacebar] para Agregar"
                            value={newTagValue}
                            onChange={({ target }) => setNewTagValue(target.value)}
                            onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}
                        />

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                            component="ul">
                            {
                                getValues('tags').map((tag) => {

                                    return (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => onDeleteTag(tag)}
                                            color="primary"
                                            size='small'
                                            sx={{ ml: 1, mt: 1 }}
                                        />
                                    );
                                })}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>

                            <Button
                                className='circular-btn' size='large'
                                fullWidth
                                startIcon={<Icon icon="line-md:upload-loop" color="#fff" width="35" />}
                                sx={{ mb: 3 }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Cargar imagen
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept='image/png, image/gif, image/jpeg'
                                style={{ display: 'none' }}
                                onChange={onFilesSelected}
                            />


                            <Chip
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('images').length < 2 ? 'flex' : 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images').map(img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia
                                                    component='img'
                                                    className='fadeIn'
                                                    image={img}
                                                    alt={img}
                                                />
                                                <CardActions>
                                                    <Button
                                                        fullWidth
                                                        color="error"
                                                        onClick={() => onDeleteImage(img)}
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let product: IProduct | null;

    if (slug === 'new') {
        // crear un producto
        const tempProduct = JSON.parse(JSON.stringify(new Product()));
        delete tempProduct._id;
        tempProduct.images = ['img1.jpg', 'img2.jpg'];
        product = tempProduct;

    } else {
        product = await dbProducts.getProductBySlug(slug.toString());
    }

    if (!product) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }


    return {
        props: {
            product
        }
    }
}


export default ProductAdminPage