import "./App.css";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [cats, setCats] = useState([
    {
      title: "",
      description: "",
      url: "",
    },
  ]);

  const [cat, setCat] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((jsonRes) => setCats(jsonRes));
  }, []);

  const handleClick = (e) => {
    setModalShow(true);
    const { name, alt } = e.target;

    setCat({
      title: name,
      description: alt,
    });
  };

  return (
    <div className="App">
      <h4>Click the image</h4>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          margin: "auto auto",
        }}
      >
        {cats
          .sort((a, b) => {
            var titleA = a.title;
            var titleB = b.title;
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
          })
          .map((cat) => {
            return (
              <img
                key={cat.title}
                src={cat.url}
                alt={cat.description}
                name={cat.title}
                onClick={handleClick}
              ></img>
            );
          })}
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={cat.title}
        description={cat.description}
      />
    </div>
  );
}

export default App;
