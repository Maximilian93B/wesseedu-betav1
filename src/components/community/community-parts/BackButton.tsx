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
        className="mb-6 bg-white dark:bg-slate-900 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:border-orange-200 dark:hover:border-orange-800 text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2 text-orange-500 dark:text-orange-600" />
        Back to Communities
      </MemoizedButton>
    </motion.div>
  )
} 