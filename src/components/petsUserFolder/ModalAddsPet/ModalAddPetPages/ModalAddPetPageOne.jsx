import scss from "./modal-add-pet-pages.module.scss"
export function ModalAddPetPageOne() {

    return (
        <div className={scss.modalAdds_page}>
            <h3 className={scss.modalAdds_page__tittle}>Add pet</h3>
            <form>
                <div className={scss.modalAdds_page_box}>
                    <label className={scss.modalAdds_page__label} >Name pet</label>
                    <input className={scss.modalAdds_page__input} type="text" name='name' placeholder="Type name pet"/>
                </div>
                <div className={scss.modalAdds_page_box}>
                    <label className={scss.modalAdds_page__label} >Data of birth</label>
                    <input className={scss.modalAdds_page__input} type="email" name='data' placeholder="Type date of birth"/>   
                </div>
                <div className={scss.modalAdds_page_box}>
                    <label className={scss.modalAdds_page__label} >Breed</label>
                    <input className={scss.modalAdds_page__input} type="text" name='breed' placeholder="Type bird" />
                </div>
            </form>
            
        </div>
    )
}
