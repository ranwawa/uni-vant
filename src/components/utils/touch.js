export default class Touch {
  #DISTANCE = 50;
  startX = 0;
  startY = 0;
  constructor() {
  }
  setStartPoint(point) {
    const { clientX, clientY } = point;
    this.startX = clientX;
    this.startY = clientY;
  }
  getMoveDistance(clientX, clientY) {
    return {
      deltaX: clientX - this.startX,
      deltaY: clientY - this.startY,
    };
  }
  getDirection(point) {
    const { clientX, clientY } = point;
    const { deltaX, deltaY } = this.getMoveDistance(clientX, clientY);
    let directionH = '';
    let directionV = '';
    if (Math.abs(deltaX) > this.#DISTANCE) {
      directionH = clientX > this.startX ? 'right' : 'left';
    }
    if (Math.abs(deltaY) > this.#DISTANCE) {
      directionV = clientY > this.startY ? 'top' : 'bottom';
    }
    return {
      directionH,
      directionV,
    };
  }
}
