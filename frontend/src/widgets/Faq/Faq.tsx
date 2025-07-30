
import { Key } from 'react'
import styles from './Faq.module.scss'
import FAQ_Item from './Faq_Item'

type Props = {
    items: any,
}

type Item = {
    id: Key | null | undefined,
    title: string,
    description: string,
}

const FAQ:React.FC<Props> = ({items}) => {
    return (
        <section className={styles['faq']}>
            <div className={styles['faq__container']}>
                <h1 className={styles['faq__title']}>Часто задаваемые вопросы</h1>

                <ul className={styles['faq__list']}>

                    {
                        items.map((item: Item) => 
                            <FAQ_Item key={item.id}
                                title={item.title}
                                description={item.description}
                            />
                        )
                    }
                </ul>
            </div>
        </section>
    )
}

export default FAQ
