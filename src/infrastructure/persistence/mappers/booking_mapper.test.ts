import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("BookingMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na Praia";
    propertyEntity.description = "Uma bela casa";
    propertyEntity.maxGuests = 4;
    propertyEntity.basePricePerNight = 100;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "João";

    const bookingEntity = new BookingEntity();
    bookingEntity.id = "1";
    bookingEntity.property = propertyEntity;
    bookingEntity.guest = userEntity;
    bookingEntity.startDate = new Date("2024-12-20");
    bookingEntity.endDate = new Date("2024-12-25");
    bookingEntity.guestCount = 2;
    bookingEntity.totalPrice = 500;
    bookingEntity.status = "CONFIRMED";

    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("1");
    expect(booking.getProperty().getId()).toBe("1");
    expect(booking.getGuest().getId()).toBe("1");
    expect(booking.getDateRange().getStartDate()).toEqual(new Date("2024-12-20"));
    expect(booking.getDateRange().getEndDate()).toEqual(new Date("2024-12-25"));
    expect(booking.getGuestCount()).toBe(2);
    expect(booking.getTotalPrice()).toBe(500);
    expect(booking.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na Praia";
    propertyEntity.description = "Uma bela casa";
    propertyEntity.maxGuests = 4;
    propertyEntity.basePricePerNight = 100;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = ""; // nome vazio

    const bookingEntity = new BookingEntity();
    bookingEntity.id = "1";
    bookingEntity.property = propertyEntity;
    bookingEntity.guest = userEntity;
    bookingEntity.startDate = new Date("2024-12-20");
    bookingEntity.endDate = new Date("2024-12-25");
    bookingEntity.guestCount = 2;
    bookingEntity.totalPrice = 500;
    bookingEntity.status = "CONFIRMED";

    expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O nome é obrigatório");
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property("1", "Casa na Praia", "Uma bela casa", 4, 100);
    const user = new User("1", "João");
    const dateRange = new DateRange(new Date("2024-12-20"), new Date("2024-12-25"));
    const booking = new Booking("1", property, user, dateRange, 2);

    const entity = BookingMapper.toPersistence(booking);

    expect(entity).toBeInstanceOf(BookingEntity);
    expect(entity.id).toBe("1");
    expect(entity.property.id).toBe("1");
    expect(entity.guest.id).toBe("1");
    expect(entity.startDate).toEqual(new Date("2024-12-20"));
    expect(entity.endDate).toEqual(new Date("2024-12-25"));
    expect(entity.guestCount).toBe(2);
    expect(entity.totalPrice).toBe(500);
    expect(entity.status).toBe("CONFIRMED");
  });
});