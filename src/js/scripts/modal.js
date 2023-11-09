document.addEventListener('DOMContentLoaded', () => {
  function getWidthScrol() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    document.body.append(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  }

  class Modal {
    constructor(name) {
      this.name = name;
      this.modal = document.querySelector(`[data-modal="${name}"]`);
      this.triggers = document.querySelectorAll(`[data-modal-el="${name}"]`);
      this.body = document.querySelector('body');
      this.openHendler();
    }

    open() {
      this.modal.classList.remove('success', 'error');
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.body.style.width = `${document.body.clientWidth - getWidthScrol()}px`;
      this.modal.addEventListener('click', this.closeHendler);
    }

    close() {
      this.modal.classList.remove('active');
      document.body.style.overflow = 'unset';
      document.body.style.width = 'auto';
      this.modal.removeEventListener('click', this.closeHendler);
    }

    success() {
      this.modal.classList.remove('error');
      this.modal.classList.add('success');
    }

    error() {
      this.modal.classList.remove('success');
      this.modal.classList.add('error');
    }

    update() {
      this.modal = document.querySelector(`[data-modal="${this.name}"]`);
      this.triggers = document.querySelectorAll(`[data-modal-el="${this.name}"]`);
      this.openHendler();
    }

    openHendler = () => {
      this.triggers.forEach((item) => {
        item.addEventListener('click', (event) => {
          event.preventDefault();
          this.open();
        });
      });
    };

    closeHendler = (event) => {
      if (event.target.classList.contains('close-x')) {
        this.close();
      }
    };
  }

  const costServices = document.querySelector('[data-modal="cost-services"]') ? new Modal('cost-services') : null;
  const thanksApplication = document.querySelector('[data-modal="thanks-application"]')
    ? new Modal('thanks-application')
    : null;
  const thanksReaching = document.querySelector('[data-modal="thanks-reaching"]') ? new Modal('thanks-reaching') : null;
  const assistanceChoosing = document.querySelector('[data-modal="assistance-choosing"]')
    ? new Modal('assistance-choosing')
    : null;
  const contactsData = document.querySelector('[data-modal="contacts-data"]') ? new Modal('contacts-data') : null;
  const checkAvailability = document.querySelector('[data-modal="check-availability"]')
    ? new Modal('check-availability')
    : null;
});
