import styles from './ReviewForm.module.css'
import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSendResponse} from "./ReviewForm.interfece";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";
import CloseIcon from '../../public/close.svg'

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: {errors}, reset, clearErrors } = useForm<IReviewForm>()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setIsError] = useState<string>()

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true)
                reset()
            } else {
                setIsError('Что-то пошло не так');
            }
        } catch (e) {
            setIsError(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    placeholder='Имя'
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                    {...register(
                        'name',
                        {required: {
                            value: true,
                            message: 'Заполните Имя'
                        }})
                    }
                    aria-invalid={!!errors.name}
                />
                <Input
                    {...register(
                        'title',
                        {required: {
                            value: true,
                            message: 'Заполните Заголовок'
                            }
                        })}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    className={styles.title}
                    aria-invalid={!!errors.title}
                    placeholder='Заголовок отзыва'
                />
                <div className={styles.rating}>
                    <span className={styles.rate}>Оценка:</span>
                    <Controller
                        render={({field}) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                        rules={{required: {
                                value: true,
                                message: 'Укажите Рейтинг'
                            }
                        }}
                        name='rating'
                        control={control}
                    />
                </div>
                <Textarea
                    {...register(
                        'description',
                        {required: {
                            value: true,
                                message: 'Заполните Описание'
                            }})}
                    error={errors.description}
                    className={styles.desc}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={!!errors.description}
                    aria-label='Текст отзыва'
                    placeholder='Текст Отзыва'/>
                <div className={styles.submit}>
                    <Button onClick={() => clearErrors()} appearance='primary' tabIndex={isOpened ? 0 : -1}>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)} role='alert'>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <button
                    onClick={() => setIsSuccess(false)}
                    className={styles.close}
                    aria-label='Закрыть оповещение'
                >
                    <CloseIcon />
                </button>
            </div>}

            {error && <div className={cn(styles.error, styles.panel)} role='alert'>
                Что-то пошло не так, попробуйте обновить страницу
                <button
                    aria-label='Закрыть оповещение'
                    onClick={() => setIsError(undefined)}
                    className={styles.close}
                >
                    <CloseIcon />
                </button>
            </div>}
        </form>
    )
}