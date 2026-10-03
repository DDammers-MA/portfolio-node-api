import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { UpdateContactDto } from './dto/update-contact.dto.js';
import { createTransport } from 'nodemailer';

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');


@Injectable()
export class ContactService {

   private readonly logger = new Logger(ContactService.name);


   async send(dto: CreateContactDto) {
    // created per call, so a missing env var can't crash the app at startup
    const transport = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    try {
      await transport.sendMail({
        to: process.env.MAIL_TO ?? 'dammersdaniel@gmail.com',
        from: `"Portfolio" <portfolio@dammienet.eu>`,
        replyTo: dto.email,
        subject: dto.subject,
        html: `
          <p>Daniel,</p>
          <p>Er is een mail binnengekomen van <b>${esc(dto.naam)}</b> over <b>${esc(dto.subject)}</b>:</p>
          <p>
            Naam: ${esc(dto.naam)} (${esc(dto.mv)})<br />
            Email: ${esc(dto.email)}<br />
            Telefoon: ${esc(dto.tel ?? 'Geen telefoonnummer opgegeven')}
          </p>
          <p>Vraag/opmerking:</p>
          <p>${esc(dto.msg).replace(/\n/g, '<br />')}</p>`,
      });
      return { message: 'Bericht verstuurd' };
    } catch (err) {
      this.logger.error(`Mail failed: ${(err as Error).message}`);
      throw new InternalServerErrorException('Er ging iets mis bij het versturen');
    }
  }
  

  create(createContactDto: CreateContactDto) {
    return 'This action adds a new contact';
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
