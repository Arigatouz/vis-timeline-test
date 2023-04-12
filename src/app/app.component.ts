import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as vis from 'vis-timeline/standalone';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'vis-timeline-test';
  @ViewChild('timeline', { static: false }) timeline: ElementRef =
    new ElementRef(null);

  constructor(private router: Router) {}
  ngOnInit() {}

  ngAfterViewInit() {
    const container = this.timeline.nativeElement;
    const items = new vis.DataSet([
      {
        id: 1,
        content: `
            <img src="https://picsum.photos/200/300?grayscale" width="50" height="50" />
          <div>
            <p>Card Title</p>
            <p>Card Description</p>
          </div>`,
        start: '2022-04-20',
        className: 'timeline__cardStyle',
        end: '2022-04-25',
      },
      {
        id: 22,
        content: `
            <img src="https://picsum.photos/200/300?grayscale" width="50" height="50" />
          <div>
            <p>Card Title</p>
            <p>Card Description</p>
          </div>`,
        start: '2022-04-22',
        className: 'timeline__cardStyle',
        end: '2022-04-27',
      },
      {
        id: 33,
        content: `
            <img src="https://picsum.photos/200/300?grayscale" width="50" height="50" />
          <div>
            <p>Card Title</p>
            <p>Card Description</p>
          </div>`,
        start: '2022-04-24',
        className: 'timeline__cardStyle',
        end: '2022-04-29',
      },
      {
        id: 44,
        content: `
            <img src="https://picsum.photos/200/300?grayscale" width="50" height="50" />
          <div>
            <p>Card Title</p>
            <p>Card Description</p>
          </div>`,
        start: '2022-04-26',
        className: 'timeline__cardStyle',
        end: '2022-05-02',
      },

      { id: 2, content: 'item 2', start: '2022-04-14' },
      { id: 3, content: 'item 3', start: '2022-04-18' },
      {
        id: 4,
        content: 'Item Red', // this could be a HTML code
        start: '2022-04-16',
        end: '2022-04-19',
        className: 'my-class',
        align: 'center',
      },
      { id: 5, content: 'item 5', start: '2022-04-25' },
      { id: 6, content: 'item 6', start: '2022-04-27' },
    ]);
    const options = {
      orientation: {
        item: 'top',
      },
      editable: {
        add: true,
        updateTime: true,
        updateGroup: true,
        remove: true,
        overrideItems: false,
      },
      margin: {
        item: 50,
        axis: 40,
        // autoResize: true,
      },
    };
    const timeline = new vis.Timeline(container, items, options);

    timeline.on('select', (properties) => {});

    // HOVER EVENT
    timeline.on('itemover', function (properties) {
      console.log(properties);
      const popup = document.createElement('div');
      popup.innerHTML = `<h1>${properties.item}</h1>`;
      popup.classList.add('popup');
      popup.style.position = 'absolute';
      popup.style.top = properties.event.pageY + 'px';
      popup.style.left = properties.event.pageX + 'px';
      popup.style.background = 'white';
      popup.style.border = '1px solid black';
      popup.style.padding = '50px';
      popup.style.zIndex = '1000';
      document.body.appendChild(popup);
    });
    timeline.on('itemout', function (properties) {
      //remove the popup
      const popup = document.querySelector('.popup')!;
      popup.remove();
    });
    // HOVER EVENT
  }
  ngOnDestroy(): void {}
}
