const notification = document.querySelector('#notification')

export const createNotification = (isError, message) => {

  const styles = isError
    ? {
        border: 'border-red-200',
        text: 'text-red-700',
        icon: '❌'
      }
    : {
        border: 'border-green-200',
        text: 'text-green-700',
        icon: ''
      }

  notification.innerHTML = `
    <div class="
      flex items-center gap-3
      bg-white/80
      border ${styles.border}
      ${styles.text}
      px-6 py-4
      rounded-2xl
      shadow-lg
      backdrop-blur-md
      animate-in
      fade-in
      slide-in-from-top-3
      duration-300
      max-w-md
      pointer-events-auto
    ">
      <span class="text-2xl">${styles.icon}</span>
      <p class="font-semibold">${message}</p>
    </div>
  `

  // Auto-cierre con animación
  setTimeout(() => {
    const box = notification.firstElementChild
    if (!box) return

    box.classList.remove('animate-in', 'fade-in', 'slide-in-from-top-3')
    box.classList.add('animate-out', 'fade-out', 'slide-out-to-top-3')

    setTimeout(() => {
      notification.innerHTML = ''
    }, 300)

  }, 3000)
}
