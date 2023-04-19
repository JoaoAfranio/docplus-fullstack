import { Content, Footer, Header, Modal, ModalOpacity } from "./style";

export default function ModalComponent({ show, setShow, title, children, hasDelete, saveFunction }) {
  return (
    <ModalOpacity show={show}>
      <Modal>
        <Header>{title}</Header>
        <Content>{children}</Content>
        <Footer>
          <button
            className="close"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancelar
          </button>
          {hasDelete && <button className="delete">Excluir</button>}
          <button onClick={saveFunction} className="save">
            Salvar
          </button>
        </Footer>
      </Modal>
    </ModalOpacity>
  );
}
