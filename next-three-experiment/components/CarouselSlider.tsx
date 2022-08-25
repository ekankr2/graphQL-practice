import React, { ReactNode, useEffect, useRef, memo } from "react";
import { useDrag, rubberbandIfOutOfBounds } from "@use-gesture/react";
import { animated, useSpring, SpringConfig } from "react-spring";
import clsx from "clsx";

const fasterConfig: SpringConfig = {
    tension: 300,
    friction: 32,
    velocity: 20
};

interface Props<T> {
    children: (item: T, index: number) => ReactNode;
    index?: number;
    onIndexChange?: (index: number, isLast: boolean) => void;
    items: T[];
    containerClassName?: string;
    /**
     * Optional will adjust the positioning of the slide after the first page
     * Useful if you want to show the next slide already a little bit.
     * Only works properly if you apply right padding on the `containerClassName`
     * You should set it to the appliedPadding / 2
     */
    padding?: number;
    config?: SpringConfig;
    rubberBandConst?: number;
}

function Slider<T>({
                       items,
                       children,
                       onIndexChange,
                       index,
                       containerClassName,
                       config = fasterConfig,
                       padding = 0,
                       rubberBandConst = 0.2
                   }: Props<T>) {
    const currentIndexRef = useRef(0);
    const [spring, api] = useSpring(() => ({ x: 0, config }));
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef(0.0);
    const itemWidth = useRef(0);

    const isLast = (maxScroll: number) =>
        Math.abs(scrollRef.current - maxScroll + padding) < itemWidth.current;

    // the scroll width of the slider
    const scrollWidth = () => containerRef.current?.scrollWidth || 0;

    // this is the full width of the wrapper element
    const width = () => containerRef.current?.parentElement?.clientWidth || 0;

    // determine the current index based on the current position
    const currentIndex = (ref = scrollRef.current) =>
        Math.round(Math.abs(ref - padding) / (scrollWidth() / items.length));

    useEffect(() => {
        const container = containerRef.current;
        const observer = new ResizeObserver((item) => {
            itemWidth.current = item[0].contentRect.width;
            currentIndexRef.current = currentIndex();
            // reset position when the elements are resized
            const maxScroll = -(scrollWidth() - width());
            scrollRef.current = Math.max(
                -(scrollWidth() / items.length) * currentIndexRef.current +
                (currentIndexRef.current > 0 ? padding : 0),
                maxScroll
            );
            if (onIndexChange) {
                onIndexChange(currentIndexRef.current, isLast(maxScroll));
            }
            api
                .update({
                    x: currentIndexRef.current === 0 ? 0 : scrollRef.current,
                    immediate: true
                })
                .start();
        });
        // we observe only the first child, assuming all react the same way on width changes
        if (container && container.children.length > 0) {
            observer.observe(container.children[0]);
        }
        return () => {
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, items, api, padding]);

    useEffect(
        () => {
            scrollRef.current = 0;
            currentIndexRef.current = 0;
            const maxScroll = -(scrollWidth() - width());
            if (onIndexChange) {
                onIndexChange(currentIndexRef.current, isLast(maxScroll));
            }
            api
                .update({
                    x: 0,
                    immediate: true
                })
                .start();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [items, scrollRef, api, padding]
    );

    useEffect(
        () => {
            if (index !== undefined && index !== currentIndexRef.current) {
                const maxScroll = -(scrollWidth() - width());
                scrollRef.current = Math.max(
                    -(scrollWidth() / items.length) * index + (index > 0 ? padding : 0),
                    maxScroll
                );
                currentIndexRef.current = index;
                if (onIndexChange) {
                    onIndexChange(currentIndexRef.current, isLast(maxScroll));
                }
                api.start({
                    x: scrollRef.current
                });
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [index, api, scrollRef, padding]
    );

    useDrag(
        ({
             down,
             direction: [dX],
             delta: [deltaX],
             movement: [moveX],
             velocity: [vX]
         }) => {
            const thisWith = width();
            const thisScrollWidth = scrollWidth();

            // General movement
            scrollRef.current += deltaX;

            const maxSlides = Math.ceil(thisScrollWidth / thisWith);

            const minOffset = itemWidth.current / 4;
            const shouldSlide = Math.abs(moveX) > minOffset;
            const isLeftEdgeBounce = scrollRef.current > 0;

            // the maximum amount we are allowed to scroll
            const maxScroll = -(thisScrollWidth - thisWith);
            const isRightEdgeBounce = scrollRef.current < maxScroll;

            // get nearest full slide based on the current position
            // we subtract some info based on the amount the user scrolled
            const thisIndex = currentIndex(scrollRef.current + dX * minOffset);
            // determine the next snap point
            const scrollNexSnap = Math.max(
                -(thisScrollWidth / items.length) * thisIndex +
                (thisIndex > 0 ? padding : 0),
                maxScroll
            );

            // check resistance, and bounce back if not overcome
            if (!down && !shouldSlide) {
                scrollRef.current = scrollNexSnap;
            }

            // check left edge
            if (!down && isLeftEdgeBounce) {
                scrollRef.current = 0;
                currentIndexRef.current = 0;
            }

            // check right edge
            if (!down && isRightEdgeBounce) {
                // it's possible that we drag so much that we "skip" slides, that's why we
                // use the minimum of our max slides here
                currentIndexRef.current = Math.min(thisIndex, maxSlides - 1);
                scrollRef.current = currentIndexRef.current === 0 ? 0 : maxScroll;
            }

            // all good and we can scroll
            if (!down && !isLeftEdgeBounce && !isRightEdgeBounce && shouldSlide) {
                // it's possible that there is some padding around the container
                // so we have to recheck the bounds here
                scrollRef.current = scrollNexSnap;
                currentIndexRef.current = thisIndex;
            }

            if (onIndexChange && !down) {
                onIndexChange(currentIndexRef.current, isLast(maxScroll));
            }

            if (down && (isLeftEdgeBounce || isRightEdgeBounce)) {
                scrollRef.current = rubberbandIfOutOfBounds(
                    scrollRef.current + moveX,
                    maxScroll >= 0 ? -60 : maxScroll - padding,
                    maxScroll - padding === 0 || maxScroll >= 0 ? 60 : 0,
                    rubberBandConst
                );
            }

            api.start({
                x: scrollRef.current
            });
        },
        {
            axis: "x",
            target: containerRef,
            pointer: {
                touch: true,
                capture: false,
                lock: false
            },
            eventOptions: { passive: false }
        }
    );

    return (
        <div className={clsx("Slider", containerClassName)}>
            <animated.div
                role="region"
                aria-label="gallery"
                draggable="false"
                ref={containerRef}
                className={"Slider__Container"}
                style={spring}
            >
                {items.map((item, i) => children(item, i))}
            </animated.div>
        </div>
    );
}

const typedMemo: <T>(c: T) => T = memo;

export default typedMemo(Slider);
