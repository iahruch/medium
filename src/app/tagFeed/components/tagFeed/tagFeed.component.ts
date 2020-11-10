import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'mc-tag-feed',
    templateUrl: './tagFeed.component.html',
    styleUrls: ['./tagFeed.component.scss'],
})
export class TagFeedComponent implements OnInit {
    apiUrl: string;
    slug: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: Params) => {
            this.slug = params.get('slug');
            this.apiUrl = `/articles?tag=${this.slug}`;
        });
    }
}
