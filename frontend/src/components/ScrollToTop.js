import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ behavior = 'auto' }) => {
    const { pathname } = useLocation()

    useEffect(() => {
        try {
            // Small timeout can help in some router transitions where content mounts after route change
            const id = setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior })
            }, 50)
            return () => clearTimeout(id)
        } catch (e) {
            // fallback
            window.scrollTo(0, 0)
        }
    }, [pathname, behavior])

    return null
}

export default ScrollToTop
