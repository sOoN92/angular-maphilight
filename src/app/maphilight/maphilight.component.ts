import {
  Component,
  Input,
  AfterContentInit, AfterViewInit,
  ElementRef,
  DoCheck, KeyValueDiffers, KeyValueDiffer,
} from '@angular/core';

declare global {
  interface Window {
    jQuery: any;
  }
  interface JQuery {
    maphilight(options?: any): any;
  }
}

@Component({
  selector: 'maphilight',
  templateUrl: './maphilight.component.html',
  styleUrls: ['./maphilight.component.css']
})
export class MaphilightComponent implements AfterViewInit {
  @Input() config: any;
  configDiffer: KeyValueDiffer<any, any>;
  el:  HTMLElement;
  img: HTMLElement;
  map: HTMLElement;

  constructor(
    private elRef: ElementRef,
    differs: KeyValueDiffers
  ) {
    this.el = this.elRef.nativeElement;
    this.configDiffer = differs.find({}).create();
  }

  ngAfterViewInit() {
    this.img = this.el.querySelector('img');
    this.map = this.el.querySelector('map');
    const id = this.el.getAttribute('id')
    this.img.setAttribute('usemap', '#' + id + ".map");
    this.map.setAttribute('id',           id + ".map");
    this.map.setAttribute('name',         id + ".map");
    this.drawCanvas();
  }

  drawCanvas() {
    window.jQuery(this.img).maphilight(this.configToApply());
  };

  ngDoCheck() {
    const changes = this.configDiffer.diff(this.config)
    if (changes) {
      this.drawCanvas()
    }
  }

  private configToApply() {
    const config = Object.assign({}, this.config)
    if (config.strokeColor && config.strokeColor[0] == '#')
      config.strokeColor = config.strokeColor.substr(1)
    if (config.fillColor && config.fillColor[0] == '#')
      config.fillColor = config.fillColor.substr(1)
    if (config.shadowColor && config.shadowColor[0] == '#')
      config.shadowColor = config.shadowColor.substr(1)
    return config
  }
}

