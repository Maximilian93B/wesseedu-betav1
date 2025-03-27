import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Memoized Button for better performance
const MemoizedButton = memo(Button);

interface BackButtonProps {
  onBack: () => void
  variants?: any
}

export const BackButton = ({ onBack, variants }: BackButtonProps) => {
  return (
    <motion.div variants={variants}>
      <MemoizedButton 
        variant="outline" 
        size="sm" 
        onClick={onBack}
        className="mb-6 bg-white dark:bg-slate-900 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
      >
        <ArrowLeft className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
        Back to Communities
      </MemoizedButton>
    </motion.div>
  )
} 