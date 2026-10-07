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
  const port = Number(process.env.SMTP_PORT ?? 465);

  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transport.verify();

    await transport.sendMail({
      to: process.env.MAIL_TO ?? 'dammersdaniel@gmail.com',

      // IMPORTANT: use the authenticated SMTP account
      from: `"Portfolio" <${process.env.SMTP_USER}>`,

      // User's email goes here so you can reply
      replyTo: dto.email,

      subject: dto.subject,

      html: `
        <p>Daniel,</p>

        <p>
          Er is een mail binnengekomen van
          <b>${esc(dto.naam)}</b>
          over
          <b>${esc(dto.subject)}</b>.
        </p>

        <p>
          <b>Naam:</b> ${esc(dto.naam)} (${esc(dto.mv)})<br />
          <b>Email:</b> ${esc(dto.email)}<br />
          <b>Telefoon:</b> ${esc(dto.tel ?? 'Geen telefoonnummer opgegeven')}
        </p>

        <p><b>Vraag/opmerking:</b></p>

        <p>
          ${esc(dto.msg).replace(/\n/g, '<br />')}
        </p>
      `,
    });

    return {
      message: 'Bericht verstuurd',
    };

  } catch (err) {
    const error = err as Error;

    this.logger.error(
      `Mail failed: ${error.message}`,
      error.stack,
    );

    throw new InternalServerErrorException(
      'Er ging iets mis bij het versturen',
    );
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
