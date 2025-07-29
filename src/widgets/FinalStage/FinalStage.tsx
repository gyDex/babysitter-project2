import Image from "next/image"
import styles from './FinalStage.module.scss'
import { useEditBabysitterStage } from "@/entities/stores/useEditBabysitterStage"

const FinalStage = () => {
    const stage = useEditBabysitterStage();

  return (
    <>
        <div className="relative bg-[white] h-[260px] max-[1024px]:min-h-[250px] max-[1024px]:pt-[125px] max-[1024px]:pb-[250px] !px-[0px]">
            <Image quality={100} height={159} width={169} className="max-[1024px]:h-[120px] max-[1024px]:right-[43px] max-[1024px]:bottom-[-20px]  max-[1024px]:w-[130px] w-[169px] h-[159px] object-cover absolute bottom-[-35px] right-[129px]" src={'/images/final-stage/cup.png'} alt='cup' />
            <Image quality={100} height={159} width={169} className="max-[1024px]:rotate-[45deg] max-[1024px]:h-[90px] max-[1024px]:w-[90px] max-[1024px]:left-[32px] max-[1024px]:top-auto max-[1024px]:bottom-[20px] max-[1024px]:w-[90px] w-[169px] h-[159px] object-cover absolute top-[-35px] left-[242px]" src={'/images/final-stage/star.png'} alt='cup' />

            <div className="z-[10] relative !w-full flex  justify-center items-center !h-full">
                <div className="w-fit flex justify-center items-center flex-col">
                    <div>
                        <span className="flex justify-center text-center items-center mt-[16px] max-[1024px]:text-[18px] font-[onest] font-semibold text-[20px] leading-[26px]">Все изменения сохранены. </span>

                        <span className="flex justify-center text-center items-center mt-[16px] max-[1024px]:text-[18px] font-[onest] font-semibold text-[20px] leading-[26px]">Родители увидят актуальную информацию</span>
                    </div>
                    
                    <div className="z-[10] relative flex max-[1024px]:!flex-col gap-[12px] w-full items-center mt-[31px]">
                        <button onClick={() => stage.setStage('eleven')} className={styles['final-stage__btn-bottom_prev']}>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.88065 3.95312L2.83398 7.99979L6.88065 12.0465" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.1673 8H2.94727" stroke="#431DED" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        Вернуться к редактированию
                        </button>

                        <button type="button" className="shrink-0 max-[1024px]:w-full text-[onest] text-[#431DED] font-medium text-[14px] leading-[18px] bg-[#E8E5F9] pt-[6px] pb-[8px] px-[12px] rounded-[8px]">
                            Посмотреть вакансии
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FinalStage
