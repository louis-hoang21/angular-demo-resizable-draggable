import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title       = 'angular-demo-resizable-draggable';
  isResizing = false;


  onDraggable(event: any) {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    const el = event.target;
    const _thisResize = this;

    let prevX = event.clientX;
    let prevY = event.clientY;

    function mousemove(e: any) {
      if (!_thisResize.isResizing) {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        const rect = el.getBoundingClientRect();

        el.style.left = rect.left - newX + "px";
        el.style.top = rect.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }

  onResize(event: any) {
    const el = event.target.parentNode;
    const _thisResize = this;

    let prevX = event.clientX;
    let prevY = event.clientY;

    this.isResizing = true;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e: any) {
      const rect = el.getBoundingClientRect();
      const width = rect.width - (prevX - e.clientX);
      const height = rect.height - (prevY - e.clientY);

      el.style.width = width + 'px';
      el.style.height = height + 'px';

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);

      //width, height icon resize
      event.target.style.width = '10px';
      event.target.style.height = '10px';

      //set isResizing
      _thisResize.isResizing = false;
    }
  }
}
