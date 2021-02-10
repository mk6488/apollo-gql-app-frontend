import Swal from 'sweetalert2/dist/sweetalert2.js'

export const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: false,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})

export const toast = (icon, msg) => {
	Toast.fire({
		icon: icon,
		title: msg
	})
}