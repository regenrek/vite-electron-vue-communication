import { describe, it, expect, vitest } from 'vitest';
// import { useStage } from './useStage';
// import { getContainer, Konva } from '../../../test/konva-test-utils';
describe('useStage', () => {
  const addEventListenerSpy = vitest.spyOn(window, 'addEventListener');

  beforeEach(() => {
    addEventListenerSpy.mockReset();
  });

  afterAll(() => {
    addEventListenerSpy.mockRestore();
  });

  it('stage size should be window size', () => {
    expect(window).toBeDefined();
    // const { initStage, stageDefaultConfig } = useStage();

    // const container = Konva.document.createElement('div');
    // container.id = 'container';
    // getContainer().appendChild(container);

    //const stage = initStage(stageDefaultConfig);

    //expect(stage.width).toBe(window.innerWidth);
    //expect(stage.height).toBe(window.innerHeight);
  });
});