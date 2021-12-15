import swal from 'sweetalert2';

type propType = {
  title: string;
  text: string;
};

export const customAlert = (props: propType) => {
  swal.fire({
    icon: 'error',
    title: props.title,
    text: props.text,
  });
};
