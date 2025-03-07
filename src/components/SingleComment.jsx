import { Component } from 'react';
import { Alert, Button, Container, Modal } from 'react-bootstrap';

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYwMGRkNTBlYTI4NjAwMTUyOGI5NTgiLCJpYXQiOjE3MzY2NzcyMjksImV4cCI6MTczNzg4NjgyOX0.zLzKm3iXeO3hZs1lPOOWUq6Ap9M1YDAS06cSDSgRtm8';

class SingleComment extends Component {
  state = {
    isError: false,
    removed: false,
  };

  handleDelete = () => {
    const deleteComment = async (commentId) => {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${commentId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Impossibile rimuovere il commento');
        }
        console.log('Commento rimosso con successo');
        this.setState({
          isError: false,
          removed: true,
        });
      } catch (error) {
        console.log('ERROR', error);
        this.setState({
          isError: true,
          removed: false,
        });
      }
    };

    deleteComment(this.props.id);
  };

  handleClose = () =>
    this.setState({ removed: false }, () => {
      this.props.updateComments();
    });

  render() {
    return (
      <Container fluid className='d-flex justify-content-between mb-3'>
        <p>{this.props.comment}</p>
        {this.state.isError && (
          <div className='text-center'>
            <Alert variant='danger'>
              Si è verificato un errore <br /> Impossibile eliminare il Commento
            </Alert>
          </div>
        )}

        {this.state.removed && (
          <Modal show={this.state.removed} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Commento rimosso con successo</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant='secondary' onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <Button variant='danger' onClick={this.handleDelete}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-trash'
            viewBox='0 0 16 16'
          >
            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
            <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
          </svg>
        </Button>
      </Container>
    );
  }
}

export default SingleComment;
