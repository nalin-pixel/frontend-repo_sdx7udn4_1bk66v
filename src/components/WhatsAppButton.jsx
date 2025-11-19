import { motion } from 'framer-motion'

export default function WhatsAppButton(){
  return (
    <motion.a
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white font-semibold flex items-center justify-center shadow-lg"
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      title="Chat on WhatsApp"
    >WA</motion.a>
  )
}
