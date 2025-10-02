import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-and-text',
  imports: [MatIconModule],
  templateUrl: './icon-and-text.component.html',
  styleUrls: ['./icon-and-text.component.scss']
})
export class IconAndTextComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() color: string = '';
}