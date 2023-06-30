interface Props {
  
}

const AddModal: React.FC<Props> = () => {
  return (
    <Modal isModalOpen={addModalOpen !== -1} setModalOpen={setAddModalOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>

        </form>
      </Modal>
  )
}

export default AddModal