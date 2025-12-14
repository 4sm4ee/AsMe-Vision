import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";

function TableList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    fetchLists();
  }, []);

  /* ===================== FETCH USERS ===================== */
  const fetchLists = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/admin/lists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Erreur chargement utilisateurs :", err);
    }
  };

  /* ===================== MODAL ===================== */
  const handleShowModal = (user) => {
    setCurrentUser(user);
    setUserData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  /* ===================== FORM ===================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  /* ===================== UPDATE USER ===================== */
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(
        `http://localhost:3000/admin/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      fetchLists();
      handleCloseModal();
    } catch (err) {
      console.error("Erreur modification utilisateur :", err);
    }
  };

  /* ===================== DELETE USER ===================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      return;

    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:3000/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLists();
    } catch (err) {
      console.error("Erreur suppression utilisateur :", err);
    }
  };

  /* ===================== RENDER ===================== */
  return (
    <Container fluid>
      <Row>
        <Col md="12">

          {/* ================= TABLE 1 ================= */}
          <Card>
            <Card.Header>
              <Card.Title as="h4">Liste des utilisateurs</Card.Title>
              <p className="card-category">
                Gestion des utilisateurs (modifier / supprimer)
              </p>
            </Card.Header>

            <Card.Body className="table-responsive">
              <Table hover striped>
                <thead>
                  <tr>
                    
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Aucun utilisateur
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleShowModal(user)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>{" "}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(user._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* ================= TABLE 2 ================= */}
          <Card className="mt-4">
            <Card.Header>
              <Card.Title as="h4">
                Nombre d’images uploadées par utilisateur
              </Card.Title>
            </Card.Header>

            <Card.Body className="table-responsive">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Total images</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Aucune donnée
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                          <strong>{user.imageCount}</strong>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

        </Col>
      </Row>

      {/* ================= MODAL ================= */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'utilisateur</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rôle</Form.Label>
              <Form.Select
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TableList;
