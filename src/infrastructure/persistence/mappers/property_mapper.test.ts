import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Casa na Praia";
    entity.description = "Uma bela casa";
    entity.maxGuests = 4;
    entity.basePricePerNight = 100;

    const property = PropertyMapper.toDomain(entity);

    expect(property).toBeInstanceOf(Property);
    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa na Praia");
    expect(property.getDescription()).toBe("Uma bela casa");
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(100);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = ""; // nome vazio
    entity.description = "Uma bela casa";
    entity.maxGuests = 4;
    entity.basePricePerNight = 100;

    expect(() => PropertyMapper.toDomain(entity)).toThrow("O nome é obrigatório");
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property = new Property("1", "Casa na Praia", "Uma bela casa", 4, 100);

    const entity = PropertyMapper.toPersistence(property);

    expect(entity).toBeInstanceOf(PropertyEntity);
    expect(entity.id).toBe("1");
    expect(entity.name).toBe("Casa na Praia");
    expect(entity.description).toBe("Uma bela casa");
    expect(entity.maxGuests).toBe(4);
    expect(entity.basePricePerNight).toBe(100);
  });
});