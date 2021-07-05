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

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: {errors}, reset } = useForm<IReviewForm>()
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
                    {...register(
                        'name',
                        {required: {
                            value: true,
                            message: 'Заполните Имя'
                        }})
                    }
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
                    className={styles.title}
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
                    placeholder='Текст Отзыва'/>
                <div className={styles.submit}>
                    <Button appearance='primary'>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <svg onClick={() => setIsSuccess(false)} className={styles.close} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.06066" y1="1.93934" x2="10.5459" y2="10.4246" stroke="#1CC37E" strokeWidth="3"/>
                    <line x1="1.93934" y1="10.4246" x2="10.4246" y2="1.93935" stroke="#1CC37E" strokeWidth="3"/>
                </svg>
            </div>}

            {error && <div className={cn(styles.error, styles.panel)}>
                Что-то пошло не так, попробуйте обновить страницу
                <svg onClick={() => setIsError(undefined)} className={styles.close} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.06066" y1="1.93934" x2="10.5459" y2="10.4246" stroke="#1CC37E" strokeWidth="3"/>
                    <line x1="1.93934" y1="10.4246" x2="10.4246" y2="1.93935" stroke="#1CC37E" strokeWidth="3"/>
                </svg>
            </div>}
        </form>
    )
}