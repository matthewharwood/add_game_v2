/**
 * Reusable drag and drop controller for any draggable elements
 * Simple, clean, and framework-agnostic
 */
export class DragDropController {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      draggableSelector: '[draggable="true"]',
      dropZoneSelector: '[data-drop-zone]',
      dragClass: 'dragging',
      overClass: 'drag-over',
      ...options
    };
    
    this.draggedElement = null;
    this.draggedClone = null;
    this.originalParent = null;
    this.currentDropZone = null;
    
    this.init();
  }
  
  init() {
    // Use event delegation for efficiency
    this.container.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.container.addEventListener('click', this.handleClick.bind(this));
  }
  
  destroy() {
    this.cleanup();
    this.container.removeEventListener('pointerdown', this.handlePointerDown);
    this.container.removeEventListener('click', this.handleClick);
  }
  
  handlePointerDown(e) {
    const draggable = e.target.closest(this.options.draggableSelector);
    if (!draggable || draggable.dataset.disabled === 'true') return;
    
    e.preventDefault();
    this.startDrag(draggable, e);
  }
  
  handleClick(e) {
    const draggable = e.target.closest(this.options.draggableSelector);
    if (!draggable || draggable.dataset.disabled === 'true') return;
    
    // Only animate if we're not dragging
    if (!this.draggedElement) {
      this.animateClick(draggable);
    }
  }
  
  startDrag(element, e) {
    this.draggedElement = element;
    this.originalParent = element.parentElement;
    
    // Get initial position
    const rect = element.getBoundingClientRect();
    this.dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    // Create a clone for dragging
    this.draggedClone = element.cloneNode(true);
    this.draggedClone.style.position = 'fixed';
    this.draggedClone.style.zIndex = '9999';
    this.draggedClone.style.width = rect.width + 'px';
    this.draggedClone.style.height = rect.height + 'px';
    this.draggedClone.style.left = (e.clientX - this.dragOffset.x) + 'px';
    this.draggedClone.style.top = (e.clientY - this.dragOffset.y) + 'px';
    this.draggedClone.style.pointerEvents = 'none';
    this.draggedClone.style.opacity = '0.9';
    this.draggedClone.style.transform = 'scale(1.2) rotate(10deg)';
    this.draggedClone.style.transformOrigin = 'center';
    this.draggedClone.style.transition = 'transform 0.2s ease';
    this.draggedClone.classList.add(this.options.dragClass);
    document.body.appendChild(this.draggedClone);
    
    // Hide original element
    element.style.opacity = '0.3';
    
    // Add global listeners
    this.boundMove = this.handlePointerMove.bind(this);
    this.boundEnd = this.handlePointerUp.bind(this);
    document.addEventListener('pointermove', this.boundMove);
    document.addEventListener('pointerup', this.boundEnd);
    
    // Notify listeners
    this.emit('dragstart', { element, e });
  }
  
  handlePointerMove(e) {
    if (!this.draggedClone) return;
    
    // Update clone position
    this.draggedClone.style.left = (e.clientX - this.dragOffset.x) + 'px';
    this.draggedClone.style.top = (e.clientY - this.dragOffset.y) + 'px';
    
    // Find drop zone under cursor
    const dropZone = this.findDropZoneAt(e.clientX, e.clientY);
    
    if (dropZone !== this.currentDropZone) {
      // Clean up previous drop zone
      if (this.currentDropZone) {
        this.currentDropZone.classList.remove(this.options.overClass);
        this.emit('dragleave', { dropZone: this.currentDropZone });
      }
      
      // Highlight new drop zone
      if (dropZone) {
        dropZone.classList.add(this.options.overClass);
        this.emit('dragenter', { dropZone });
      }
      
      this.currentDropZone = dropZone;
    }
    
    this.emit('dragmove', { e });
  }
  
  handlePointerUp(e) {
    if (!this.draggedElement) return;
    
    const dropZone = this.currentDropZone;
    
    // Immediately handle the drop (no delay)
    if (dropZone && dropZone !== this.originalParent) {
      this.handleDrop(this.draggedElement, dropZone);
    } else {
      // Return to original position
      this.draggedElement.style.opacity = '';
    }
    
    // Animate clone fadeout in parallel (non-blocking)
    if (this.draggedClone) {
      const clone = this.draggedClone; // Store reference for async cleanup
      clone.style.transform = 'scale(0.8) rotate(0deg)';
      clone.style.opacity = '0';
      
      // Clean up clone after animation completes
      setTimeout(() => {
        if (clone && clone.parentNode) {
          clone.remove();
        }
      }, 200);
    }
    
    // Clean up immediately (except clone which animates out)
    this.draggedClone = null; // Clear reference immediately
    this.cleanup();
    this.emit('dragend', { element: this.draggedElement, dropZone });
  }
  
  handleDrop(element, dropZone) {
    // Check if drop zone already has content
    const existingElement = dropZone.querySelector(this.options.draggableSelector);
    
    if (existingElement && this.originalParent) {
      // Swap elements with a quick transition
      existingElement.style.transition = 'transform 0.15s ease';
      existingElement.style.transform = 'scale(0.95)';
      this.originalParent.appendChild(existingElement);
      
      setTimeout(() => {
        existingElement.style.transform = '';
        existingElement.style.transition = '';
      }, 150);
    }
    
    // Move element to new drop zone with quick landing animation
    element.style.transition = 'all 0.15s ease';
    element.style.transform = 'scale(1.05)';
    dropZone.appendChild(element);
    element.style.opacity = '';
    
    // Settle into final position quickly
    setTimeout(() => {
      element.style.transform = '';
      element.style.transition = '';
    }, 150);
    
    this.emit('drop', { element, dropZone, swapped: existingElement });
  }
  
  findDropZoneAt(x, y) {
    // Hide clone temporarily to get element underneath
    this.draggedClone.style.display = 'none';
    const elementBelow = document.elementFromPoint(x, y);
    this.draggedClone.style.display = '';
    
    if (!elementBelow) return null;
    
    // Find closest drop zone
    return elementBelow.closest(this.options.dropZoneSelector);
  }
  
  animateClick(element) {
    element.style.transform = 'scale(1.1) rotate(5deg)';
    element.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
      element.style.transform = '';
      setTimeout(() => {
        element.style.transition = '';
      }, 300);
    }, 300);
    
    this.emit('click', { element });
  }
  
  cleanup() {
    // Remove clone only if it hasn't been handled already
    if (this.draggedClone && this.draggedClone.parentNode) {
      this.draggedClone.remove();
      this.draggedClone = null;
    }
    
    // Clean up drop zones
    if (this.currentDropZone) {
      this.currentDropZone.classList.remove(this.options.overClass);
    }
    
    // Remove global listeners
    document.removeEventListener('pointermove', this.boundMove);
    document.removeEventListener('pointerup', this.boundEnd);
    
    // Reset state
    this.draggedElement = null;
    this.originalParent = null;
    this.currentDropZone = null;
  }
  
  // Simple event emitter
  emit(eventName, detail) {
    this.container.dispatchEvent(new CustomEvent(`drag:${eventName}`, { 
      detail,
      bubbles: true 
    }));
  }
}