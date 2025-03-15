import { useRef, useEffect, useCallback } from "react"
import { LucideIcon } from "lucide-react"

interface Problem {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Solution {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  connectedTo: string[];
  solves: string;
}

interface ConnectingLinesProps {
  problems: Problem[];
  solutions: Solution[];
}

export const ConnectingLines = ({ problems, solutions }: ConnectingLinesProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathMapRef = useRef<Record<string, SVGPathElement[]>>({});
  
  const drawConnectingLines = useCallback(() => {
    if (!svgRef.current) return;
    
    // Clear existing paths
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }
    pathMapRef.current = {};
    
    const containerRect = svgRef.current.getBoundingClientRect();
    
    solutions.forEach((solution: Solution) => {
      const solutionElement = document.getElementById(`solution-${solution.id}`);
      if (!solutionElement) return;
      
      // Get the icon container instead of the whole element
      const solutionIconContainer = solutionElement.querySelector(".icon-container");
      if (!solutionIconContainer) return;
      
      const solutionRect = solutionIconContainer.getBoundingClientRect();
      
      // Use the left edge of the solution icon (for right-to-left connection)
      const solutionX = solutionRect.left - containerRect.left;
      const solutionY = solutionRect.top + solutionRect.height / 2 - containerRect.top;
      
      pathMapRef.current[`solution-${solution.id}`] = [];
      
      solution.connectedTo.forEach((problemId: string) => {
        const problemElement = document.getElementById(`problem-${problemId}`);
        if (!problemElement) return;
        
        // Get the icon container instead of the whole element
        const problemIconContainer = problemElement.querySelector(".icon-container");
        if (!problemIconContainer) return;
        
        const problemRect = problemIconContainer.getBoundingClientRect();
        
        // Use the right edge of the problem icon (for left-to-right connection)
        const problemX = problemRect.right - containerRect.left;
        const problemY = problemRect.top + problemRect.height / 2 - containerRect.top;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Get the midpoint between the two elements
        const midX = (problemX + solutionX) / 2;
        
        // Create a bezier curve that gives plenty of space around text
        // We'll use a more vertical path to avoid text
        const horizontalOffset = 20; // Space from icon edge
        const verticalOffset = 40; // How much the curve bends vertically

        // Determine if we need to curve up or down based on relative positions
        const isBelow = problemY > solutionY;
        const curveDirection = isBelow ? -1 : 1;
        
        // Start and end points with slight offsets to prevent overlap with icons
        const startX = problemX + horizontalOffset;
        const endX = solutionX - horizontalOffset;
        
        // Create a curve that goes out and around text
        const d = `M ${problemX} ${problemY} 
                   C ${startX + 30} ${problemY}, 
                     ${midX} ${problemY + (verticalOffset * curveDirection)}, 
                     ${midX} ${problemY + (verticalOffset * curveDirection)}
                   C ${midX} ${problemY + (verticalOffset * curveDirection)}, 
                     ${endX - 30} ${solutionY}, 
                     ${solutionX} ${solutionY}`;
        
        path.setAttribute('d', d);
        // Make stroke transparent initially
        path.setAttribute('stroke', 'rgba(20, 184, 166, 0)');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-dasharray', '3,3');
        path.setAttribute('data-problem', `problem-${problemId}`);
        path.setAttribute('data-solution', `solution-${solution.id}`);
        path.classList.add('connection-path');
        
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'stroke-dashoffset');
        animate.setAttribute('from', '0');
        animate.setAttribute('to', '18');
        animate.setAttribute('dur', '3s');
        animate.setAttribute('repeatCount', 'indefinite');
        path.appendChild(animate);
        
        svgRef.current?.appendChild(path);
        
        pathMapRef.current[`solution-${solution.id}`].push(path);
        if (!pathMapRef.current[`problem-${problemId}`]) {
          pathMapRef.current[`problem-${problemId}`] = [];
        }
        pathMapRef.current[`problem-${problemId}`].push(path);
      });
    });
  }, [solutions]);

  const handleMouseEnter = useCallback((id: string, type: 'problem' | 'solution') => {
    const element = document.getElementById(`${type}-${id}`);
    if (!element) return;
    
    element.classList.add('highlight-node');
    const paths = pathMapRef.current[`${type}-${id}`] || [];
    
    paths.forEach(path => {
      // Make the path visible with a transition effect
      path.setAttribute('stroke', 'rgba(20, 184, 166, 0.8)');
      path.setAttribute('stroke-width', '2');
      path.style.transition = 'stroke 0.3s ease';
      
      const connectedId = path.getAttribute(`data-${type === 'problem' ? 'solution' : 'problem'}`);
      if (connectedId) {
        const connectedElement = document.getElementById(connectedId);
        if (connectedElement) {
          connectedElement.classList.add('highlight-node');
        }
      }
    });
  }, []);

  const handleMouseLeave = useCallback((id: string, type: 'problem' | 'solution') => {
    const element = document.getElementById(`${type}-${id}`);
    if (!element) return;
    
    element.classList.remove('highlight-node');
    const paths = pathMapRef.current[`${type}-${id}`] || [];
    
    paths.forEach(path => {
      // Hide the path again
      path.setAttribute('stroke', 'rgba(20, 184, 166, 0)');
      path.setAttribute('stroke-width', '1.5');
      
      const connectedId = path.getAttribute(`data-${type === 'problem' ? 'solution' : 'problem'}`);
      if (connectedId) {
        const connectedElement = document.getElementById(connectedId);
        if (connectedElement) {
          connectedElement.classList.remove('highlight-node');
        }
      }
    });
  }, []);

  useEffect(() => {
    const eventHandlers = new Map<string, { enter: () => void; leave: () => void }>();

    const addEventListeners = () => {
      problems.forEach((problem: Problem) => {
        const element = document.getElementById(`problem-${problem.id}`);
        if (!element) return;
        
        const handlers = {
          enter: () => handleMouseEnter(problem.id, 'problem'),
          leave: () => handleMouseLeave(problem.id, 'problem')
        };
        
        eventHandlers.set(`problem-${problem.id}`, handlers);
        element.addEventListener('mouseenter', handlers.enter);
        element.addEventListener('mouseleave', handlers.leave);
      });
      
      solutions.forEach((solution: Solution) => {
        const element = document.getElementById(`solution-${solution.id}`);
        if (!element) return;
        
        const handlers = {
          enter: () => handleMouseEnter(solution.id, 'solution'),
          leave: () => handleMouseLeave(solution.id, 'solution')
        };
        
        eventHandlers.set(`solution-${solution.id}`, handlers);
        element.addEventListener('mouseenter', handlers.enter);
        element.addEventListener('mouseleave', handlers.leave);
      });
    };

    addEventListeners();
    
    return () => {
      eventHandlers.forEach((handlers, id) => {
        const element = document.getElementById(id);
        if (element) {
          element.removeEventListener('mouseenter', handlers.enter);
          element.removeEventListener('mouseleave', handlers.leave);
        }
      });
    };
  }, [problems, solutions, handleMouseEnter, handleMouseLeave]);

  useEffect(() => {
    drawConnectingLines();
    window.addEventListener('resize', drawConnectingLines);
    
    return () => {
      window.removeEventListener('resize', drawConnectingLines);
    };
  }, [drawConnectingLines]);

  return (
    <svg
      ref={svgRef}
      className="connecting-lines-svg absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}; 