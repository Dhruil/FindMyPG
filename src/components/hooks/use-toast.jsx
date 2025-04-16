// Simple toast hook for notifications
export function useToast() {
  const toast = ({ title, description }) => {
    // Create toast element
    const toastEl = document.createElement("div")
    toastEl.className =
      "fixed top-20 right-25 z-50 bg-white shadow-lg rounded-lg p-4 max-w-md flex flex-col gap-1 animate-in fade-in slide-in-from-top-10"

    // Add title
    if (title) {
      const titleEl = document.createElement("div")
      titleEl.className = "font-semibold"
      titleEl.textContent = title
      toastEl.appendChild(titleEl)
    }

    // Add description
    if (description) {
      const descEl = document.createElement("div")
      descEl.className = "text-sm text-gray-500"
      descEl.textContent = description
      toastEl.appendChild(descEl)
    }

    // Add to DOM
    document.body.appendChild(toastEl)

    // Remove after 3 seconds
    setTimeout(() => {
      toastEl.classList.add("animate-out", "fade-out", "slide-out-to-right-5")
      setTimeout(() => {
        document.body.removeChild(toastEl)
      }, 300)
    }, 3000)
  }

  return { toast }
}

