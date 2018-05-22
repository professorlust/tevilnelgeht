const Rect = Phaser.Geom.Rectangle;

export const data = [
  '....77....',
  '....77....',
  '..776677..',
  '.77777777.',
  '.7.7777.7.',
  '77.7777.77',
  '77.7777.77',
  '..77..77..',
  '..7....7..',
  '.77....77.'
];

export const sockets = {
  head: [new Rect(4, 0, 2, 2)],
  neck: [new Rect(4, 2, 2, 1)],
  shoulders: [new Rect(2, 2, 2, 2), new Rect(6, 2, 2, 2)],
  torso: [new Rect(2, 2, 6, 2), new Rect(3, 4, 4, 3)],
  waist: [new Rect(3, 5, 4, 1)],
  rightArm: [new Rect(1, 3, 1, 2)],
  leftArm: [new Rect(8, 3, 1, 2)],
  rightHand: [new Rect(0, 5, 2, 2)],
  leftHand: [new Rect(8, 5, 2, 2)],
  rightLeg: [new Rect(2, 7, 2, 1)],
  leftLeg: [new Rect(6, 7, 2, 1)],
  rightFoot: [new Rect(2, 8, 1, 1), new Rect(1, 9, 2, 1)],
  leftFoot: [new Rect(9, 8, 1, 1), new Rect(9, 9, 2, 1)]
};