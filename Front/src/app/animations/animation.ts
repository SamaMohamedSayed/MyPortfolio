import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                position: 'absolute',
                top: '4%',
                left: 0,
                width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%', opacity: 0 })
            ]),
            group([
                query(':leave', [
                animate('700ms ease-out', style({ left: '-100%', opacity: 0 }))
                ]),
                query(':enter', [
                animate('700ms ease-out', style({ left: '0%', opacity: 1 }))
                ])
            ])
        ])
    ]);