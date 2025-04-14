"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Edit2, Trash2, Check, Target, Award, Clock, Filter, ChevronDown, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CACHE_KEYS, CACHE_EXPIRY, getCachedData, setCachedData, invalidateCache } from "@/lib/utils/cacheUtils"

interface Goal {
  id: string
  user_id: string
  title: string
  description: string | null
  target_amount: number
  current_amount: number
  category: 'environmental' | 'social' | 'governance'
  start_date: string
  target_date: string | null
  status: 'active' | 'completed' | 'abandoned'
  created_at: string
  updated_at: string
}

interface Milestone {
  id: string
  user_id: string
  title: string
  description: string | null
  is_achieved: boolean
  achievement_date: string | null
  image_url: string | null
  created_at: string
}

interface GoalsData {
  goals: Goal[]
  milestones: Milestone[]
}

interface GoalTrackerProps {
  userId: string
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ userId }) => {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_amount: '',
    category: 'environmental',
    target_date: ''
  })
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [authError, setAuthError] = useState(false)
  
  // Fetch goals and milestones
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true)
        setError(null)
        setAuthError(false)
        
        // Check for cached data first with proper typing
        const cachedData = getCachedData<GoalsData>(CACHE_KEYS.GOALS_DATA, CACHE_EXPIRY.GOALS_DATA)
        
        if (cachedData) {
          setGoals(cachedData.goals || [])
          setMilestones(cachedData.milestones || [])
          setLoading(false)
          return
        }
        
        // Fetch fresh data if no cache exists
        const { data, error, status } = await fetchWithAuth('/api/dashboard/goals')
        
        // Handle unauthorized error
        if (status === 401) {
          console.log("Authentication error - redirecting to login")
          setAuthError(true)
          setLoading(false)
          
          // Clear any cached data for this feature
          invalidateCache(CACHE_KEYS.GOALS_DATA)
          
          // Redirect to login after a short delay
          setTimeout(() => {
            router.push("/auth/signin")
          }, 1000)
          return
        }
        
        if (error) {
          console.error("Error fetching goals data:", error)
          setError("Failed to load goals data")
          toast({
            title: "Error",
            description: "Failed to load goals data",
            variant: "destructive"
          })
          setLoading(false)
          return
        }
        
        if (!data) {
          setError("No goals data available")
          setLoading(false)
          return
        }
        
        // Cache the data
        setCachedData(CACHE_KEYS.GOALS_DATA, data)
        
        // Update state with the fetched data
        setGoals(data.goals || [])
        setMilestones(data.milestones || [])
        setLoading(false)
      } catch (err) {
        console.error("Error in goals data fetch:", err)
        setError("An unexpected error occurred")
        setLoading(false)
      }
    }
    
    if (userId) {
      fetchGoalData()
    }
  }, [userId, toast, router])
  
  // Calculate progress percentage
  const calculateProgress = (goal: Goal): number => {
    if (goal.target_amount <= 0) return 0
    const progress = (goal.current_amount / goal.target_amount) * 100
    return Math.min(progress, 100)
  }
  
  // Format currency values
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
  
  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Not set'
    
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  // Handle radio changes
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    })
  }
  
  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      target_amount: '',
      category: 'environmental',
      target_date: ''
    })
  }
  
  // Create a new goal
  const handleCreateGoal = async () => {
    try {
      const { title, description, target_amount, category, target_date } = formData
      
      if (!title || !target_amount) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }
      
      const goalData = {
        title,
        description: description || null,
        target_amount: parseFloat(target_amount),
        category,
        target_date: target_date || null
      }
      
      const { data, error, status } = await fetchWithAuth('/api/dashboard/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goalData)
      })
      
      // Handle unauthorized error
      if (status === 401) {
        setAuthError(true)
        invalidateCache(CACHE_KEYS.GOALS_DATA)
        setTimeout(() => {
          router.push("/auth/signin")
        }, 1000)
        return
      }
      
      if (error) {
        console.error("Error creating goal:", error)
        toast({
          title: "Error",
          description: "Failed to create goal",
          variant: "destructive"
        })
        return
      }
      
      // Invalidate cache
      invalidateCache(CACHE_KEYS.GOALS_DATA)
      
      // Add new goal to state
      setGoals([data.goal, ...goals])
      
      // Reset form and close dialog
      resetFormData()
      setIsCreateDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Goal created successfully",
        variant: "default"
      })
    } catch (err) {
      console.error("Error in goal creation:", err)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    }
  }
  
  // Update goal
  const handleUpdateGoal = async () => {
    if (!editingGoal) return
    
    try {
      const { title, description, target_amount, category, target_date } = formData
      
      if (!title || !target_amount) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }
      
      const goalData = {
        title,
        description: description || null,
        target_amount: parseFloat(target_amount),
        category,
        target_date: target_date || null
      }
      
      const { data, error } = await fetchWithAuth(`/api/dashboard/goals/${editingGoal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goalData)
      })
      
      if (error) {
        console.error("Error updating goal:", error)
        toast({
          title: "Error",
          description: "Failed to update goal",
          variant: "destructive"
        })
        return
      }
      
      // Invalidate cache
      invalidateCache(CACHE_KEYS.GOALS_DATA)
      
      // Update goals state
      setGoals(goals.map(goal => goal.id === editingGoal.id ? data.goal : goal))
      
      // Reset form and close dialog
      setEditingGoal(null)
      resetFormData()
      setIsEditDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Goal updated successfully",
        variant: "default"
      })
    } catch (err) {
      console.error("Error in goal update:", err)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    }
  }
  
  // Delete goal
  const handleDeleteGoal = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return
    
    try {
      const { data, error } = await fetchWithAuth(`/api/dashboard/goals?id=${id}`, {
        method: 'DELETE'
      })
      
      if (error) {
        console.error("Error deleting goal:", error)
        toast({
          title: "Error",
          description: "Failed to delete goal",
          variant: "destructive"
        })
        return
      }
      
      // Invalidate cache
      invalidateCache(CACHE_KEYS.GOALS_DATA)
      
      // Update goals state
      setGoals(goals.filter(goal => goal.id !== id))
      
      toast({
        title: "Success",
        description: "Goal deleted successfully",
        variant: "default"
      })
    } catch (err) {
      console.error("Error in goal deletion:", err)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    }
  }
  
  // Mark goal as complete
  const handleCompleteGoal = async (id: string) => {
    try {
      const { data, error } = await fetchWithAuth(`/api/dashboard/goals/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'completed' })
      })
      
      if (error) {
        console.error("Error completing goal:", error)
        toast({
          title: "Error",
          description: "Failed to complete goal",
          variant: "destructive"
        })
        return
      }
      
      // Invalidate cache
      invalidateCache(CACHE_KEYS.GOALS_DATA)
      
      // Update goals state
      setGoals(goals.map(goal => goal.id === id ? data.goal : goal))
      
      // Refresh milestone data
      const { data: milestonesData } = await fetchWithAuth('/api/dashboard/goals')
      if (milestonesData?.milestones) {
        setMilestones(milestonesData.milestones)
      }
      
      toast({
        title: "Success",
        description: "Goal marked as complete",
        variant: "default"
      })
    } catch (err) {
      console.error("Error in completing goal:", err)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    }
  }
  
  // Open edit dialog
  const openEditDialog = (goal: Goal) => {
    setEditingGoal(goal)
    setFormData({
      title: goal.title,
      description: goal.description || '',
      target_amount: goal.target_amount.toString(),
      category: goal.category,
      target_date: goal.target_date || ''
    })
    setIsEditDialogOpen(true)
  }
  
  // Filter goals
  const filteredGoals = goals.filter(goal => {
    if (categoryFilter && goal.category !== categoryFilter) return false
    if (statusFilter && goal.status !== statusFilter) return false
    return true
  })
  
  // Auth error state
  if (authError) {
    return (
      <div className="p-4 text-center">
        <p className="text-amber-600 mb-2">Session expired. Redirecting to login...</p>
      </div>
    )
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white"
        >
          Retry
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-5">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Goal Tracking</h2>
          <p className="text-sm text-gray-500">Track your sustainable investment progress</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                {categoryFilter ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1) : 'Category'}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCategoryFilter(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('environmental')}>Environmental</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('social')}>Social</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('governance')}>Governance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Target className="h-4 w-4 mr-1" />
                {statusFilter ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) : 'Status'}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('abandoned')}>Abandoned</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Create Goal Button */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white">
                <Plus className="h-4 w-4 mr-1" /> New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set a sustainable investment goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Invest in renewable energy"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your goal..."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_amount">Target Amount ($)</Label>
                  <Input
                    id="target_amount"
                    name="target_amount"
                    type="number"
                    placeholder="1000"
                    value={formData.target_amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <RadioGroup value={formData.category} onValueChange={handleCategoryChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="environmental" id="environmental" />
                      <Label htmlFor="environmental">Environmental</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="social" id="social" />
                      <Label htmlFor="social">Social</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="governance" id="governance" />
                      <Label htmlFor="governance">Governance</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_date">Target Date (optional)</Label>
                  <Input
                    id="target_date"
                    name="target_date"
                    type="date"
                    value={formData.target_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateGoal} className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white">
                  Create Goal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <AnimatePresence>
              {milestones.slice(0, 3).map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 shadow border border-amber-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 bg-yellow-200 rounded-full p-2">
                      <Award className="h-5 w-5 text-yellow-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900">{milestone.title}</h4>
                      <p className="text-sm text-amber-700">{milestone.description}</p>
                      {milestone.achievement_date && (
                        <p className="text-xs text-amber-600 mt-2 flex items-center">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {formatDate(milestone.achievement_date)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      
      {/* Goals Grid */}
      {filteredGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-lg p-4 shadow-sm border ${
                  goal.status === 'completed' 
                    ? 'border-green-200' 
                    : goal.status === 'abandoned'
                    ? 'border-gray-200'
                    : 'border-blue-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{goal.title}</h3>
                      <span 
                        className={`text-xs py-0.5 px-2 rounded-full ${
                          goal.category === 'environmental' 
                            ? 'bg-green-100 text-green-800' 
                            : goal.category === 'social'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                  </div>
                  
                  <div className="flex space-x-1">
                    {goal.status === 'active' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(goal)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleCompleteGoal(goal.id)}
                          className="h-8 w-8"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{Math.round(calculateProgress(goal))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.status === 'completed' 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-[#70f570] to-[#49c628]'
                      }`}
                      style={{ width: `${calculateProgress(goal)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Current:</span>
                    <span className="ml-1 font-medium">{formatCurrency(goal.current_amount)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Target:</span>
                    <span className="ml-1 font-medium">{formatCurrency(goal.target_amount)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className={`ml-1 font-medium ${
                      goal.status === 'completed' 
                        ? 'text-green-600' 
                        : goal.status === 'abandoned'
                        ? 'text-gray-600'
                        : 'text-blue-600'
                    }`}>
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Target Date:</span>
                    <span className="ml-1 font-medium truncate">{formatDate(goal.target_date)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Goals Found</h3>
          <p className="text-sm text-gray-600 mb-4">
            {categoryFilter || statusFilter
              ? "No goals match your current filters. Try changing your filters or create a new goal."
              : "Start tracking your sustainable investment journey by creating your first goal."}
          </p>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white"
          >
            <Plus className="h-4 w-4 mr-1" /> Create Goal
          </Button>
        </div>
      )}
      
      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Update your sustainable investment goal.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                placeholder="e.g., Invest in renewable energy"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description (optional)</Label>
              <Textarea
                id="edit-description"
                name="description"
                placeholder="Describe your goal..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-target_amount">Target Amount ($)</Label>
              <Input
                id="edit-target_amount"
                name="target_amount"
                type="number"
                placeholder="1000"
                value={formData.target_amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <RadioGroup value={formData.category} onValueChange={handleCategoryChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="environmental" id="edit-environmental" />
                  <Label htmlFor="edit-environmental">Environmental</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social" id="edit-social" />
                  <Label htmlFor="edit-social">Social</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="governance" id="edit-governance" />
                  <Label htmlFor="edit-governance">Governance</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-target_date">Target Date (optional)</Label>
              <Input
                id="edit-target_date"
                name="target_date"
                type="date"
                value={formData.target_date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateGoal} className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white">
              Update Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GoalTracker 