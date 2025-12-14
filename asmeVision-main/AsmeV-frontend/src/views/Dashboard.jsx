import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    fetchusers();
  }, []);

  const fetchusers = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError("Aucun token trouvé. Veuillez vous reconnecter.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/admin/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Accès refusé. Vous devez être administrateur.");
        } else if (response.status === 401) {
          throw new Error("Token invalide ou expiré. Veuillez vous reconnecter.");
        } else {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
      }

      const result = await response.json();
      console.log('Data received:', result);
      
      setData(result);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container fluid>
        <div className="text-center py-5">
          <p>Chargement des données...</p>
        </div>
      </Container>
    );
  }

  if (err) {
    return (
      <Container fluid>
        <div className="text-center py-5 text-danger">
          <h4>Erreur</h4>
          <p>{err}</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => {
              localStorage.clear();
              window.location.href = '/admin/login';
            }}
          >
            Retour à la connexion
          </button>
        </div>
      </Container>
    );
  }

  if (!data || !data.statistics) {
    return (
      <Container fluid>
        <div className="text-center py-5">
          <p>Aucune donnée disponible</p>
        </div>
      </Container>
    );
  }
   const pieData = [
    { name: 'Clients', value: data.statistics.totalUsers },
    { name: 'Rendez-vous ce mois', value: data.statistics.totalAdmins },
    { name: 'Administrateurs', value: data.statistics.totalImages },
  ];
  const COLORS = ['#FF0000', '#008000', '#FFA500'];

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-users text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Utilisateurs</p>
                      <Card.Title as="h4">{data.statistics.totalUsers}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Mis à jour maintenant
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-user-shield text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Admins</p>
                      <Card.Title as="h4">{data.statistics.totalAdmins}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="far fa-clock mr-1"></i>
                  Dans les dernières 24h
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-images text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Images</p>
                      <Card.Title as="h4">{data.statistics.totalImages}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt mr-1"></i>
                  Mis à jour maintenant
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-user text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Admin connecté</p>
                      <Card.Title as="h6">{data.adminConnected.firstname}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr />
                <div className="stats">
                  <i className="fas fa-envelope mr-1"></i>
                  {data.adminConnected.email}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Statistiques d'utilisation</Card.Title>
                <p className="card-category">Performances de l'année 2024</p>
              </Card.Header>
              <Card.Body>
                    <div className="mt-2 text-center">
                      <h4>Répartition des statistiques</h4>
                      <PieChart width={650} height={300}>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="45%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                      </PieChart>
                    </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Ouvert <i className="fas fa-circle text-danger"></i>
                  Clic <i className="fas fa-circle text-warning"></i>
                  Clic deuxième fois
                </div>
                <hr />
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Mis à jour il y a 3 minutes
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;