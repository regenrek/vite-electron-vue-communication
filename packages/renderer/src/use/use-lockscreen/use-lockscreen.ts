import { watch, isRef, onScopeDispose } from 'vue';

// import getScrollBarWidth from '@meng-ui-vue/utils/scrollbar-width';
// import { throwError } from '@meng-ui-vue/utils/error';
import { addClass, removeClass, hasClass, getStyle } from '../utils/dom';

import type { Ref } from 'vue';

/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */
export const useLockscreen = (trigger: Ref<boolean>) => {
    if (!isRef(trigger)) {
        console.log('throw error');
        // throwError(
        //     '[useLockscreen]',
        //     'You need to pass a ref param to this function',
        // );
    }
    let scrollBarWidth = 0;
    let withoutHiddenClass = false;
    let bodyPaddingRight = '0';
    let computedBodyPaddingRight = 0;

    const cleanup = () => {
        removeClass(document.body, 'mx-popup-parent--hidden');
        if (withoutHiddenClass) {
            document.body.style.paddingRight = bodyPaddingRight;
        }
    };
    watch(trigger, (val) => {
        if (!val) {
            cleanup();
            return;
        }

        withoutHiddenClass = !hasClass(document.body, 'mx-popup-parent--hidden');
        if (withoutHiddenClass) {
            bodyPaddingRight = document.body.style.paddingRight;
            computedBodyPaddingRight = parseInt(
                getStyle(document.body, 'paddingRight'),
                10,
            );
        }
        //scrollBarWidth = getScrollBarWidth();
        scrollBarWidth = 2;
        const bodyHasOverflow =
            document.documentElement.clientHeight < document.body.scrollHeight;
        const bodyOverflowY = getStyle(document.body, 'overflowY');
        if (
            scrollBarWidth > 0 &&
            (bodyHasOverflow || bodyOverflowY === 'scroll') &&
            withoutHiddenClass
        ) {
            document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth
                }px`;
        }
        addClass(document.body, 'mx-popup-parent--hidden');
    });
    onScopeDispose(() => cleanup());
};