export type SceneChapter = 'hero' | 'aumovio' | 'experience' | 'projects' | 'skills' | 'contact';

export interface MotionState {
  scrollProgress: number;
  scrollVelocity: number;
  pointerX: number; // -1 to 1
  pointerY: number; // -1 to 1
  pointerSpeed: number; // 0 to 1
  activeChapter: SceneChapter;
  chapterIndex: number; // 0 to 5 continuous/discrete
  aumovioPulseActive: boolean;
  aumovioHoveredNode: number; // -1 or 0..4
  activeCarouselIndex: number;
}

export const motionState: MotionState = {
  scrollProgress: 0,
  scrollVelocity: 0,
  pointerX: 0,
  pointerY: 0,
  pointerSpeed: 0,
  activeChapter: 'hero',
  chapterIndex: 0,
  aumovioPulseActive: false,
  aumovioHoveredNode: -1,
  activeCarouselIndex: 0,
};
